<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\UserProviderInterface;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

// Define the controller responsible for handling login redirections
class LoginRedirectionController extends AbstractController
{
    // Define route for login that only accepts GET requests
    #[Route('/login', name: 'create_session', methods: ['GET'])]
    public function createSession(Request $request, JWTEncoderInterface $jwtEncoder, UserProviderInterface $userProvider): Response
    {
        // Extract the token from the Authorization header and remove the 'Bearer ' prefix
        $token = str_replace('Bearer ', '', $request->headers->get('Authorization'));

        try {
            // Attempt to decode the JWT token to authenticate the user
            $decodedToken = $jwtEncoder->decode($token);
            if (!$decodedToken) {
                throw new \Exception('Invalid Token'); // Throw exception if token is invalid
            }
            // Load the user using the username provided in the decoded token
            $user = $userProvider->loadUserByIdentifier($decodedToken['username']);

            // Manually set the security token for the user, effectively logging them in
            $this->container->get('security.token_storage')->setToken(new UsernamePasswordToken($user, 'main', $user->getRoles()));

            // Optionally start a session explicitly if required
            $session = $request->getSession();
            $session->set('_security_main', serialize($this->container->get('security.token_storage')->getToken()));

            // Return a success message if the session is created successfully
            return $this->json(['message' => 'Session created successfully']);
        } catch (\Exception $e) {
            // Return an error message if an exception occurs, with an HTTP 401 Unauthorized status
            return $this->json(['error' => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        }
    }
}