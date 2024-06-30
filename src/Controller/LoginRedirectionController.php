<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\UserProviderInterface;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

class LoginRedirectionController extends AbstractController
{
    #[Route('/login', name: 'create_session', methods: ['GET'])]
    public function createSession(Request $request, JWTEncoderInterface $jwtEncoder, UserProviderInterface $userProvider): Response
    {
        $token = str_replace('Bearer ', '', $request->headers->get('Authorization'));

        try {
            // Decode the token
            $decodedToken = $jwtEncoder->decode($token);
            if (!$decodedToken) {
                throw new \Exception('Invalid Token');
            }
            $user = $userProvider->loadUserByIdentifier($decodedToken['username']);

            // Manually log in the user
            $this->container->get('security.token_storage')->setToken(new UsernamePasswordToken($user, 'main', $user->getRoles()));

            // If you need to explicitly start a session
            $session = $request->getSession();
            $session->set('_security_main', serialize($this->container->get('security.token_storage')->getToken()));

            return $this->json(['message' => 'Session created successfully']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        }
    }
}