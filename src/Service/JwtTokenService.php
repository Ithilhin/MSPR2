<?php 

namespace App\Service;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;

class JwtTokenService
{
    private $encoder;
    private $userProvider;
    private $jwtManager;

    public function __construct(JWTEncoderInterface $encoder, UserProviderInterface $userProvider, JWTManager $jwtManager)
    {
        $this->encoder = $encoder;
        $this->userProvider = $userProvider;
        $this->jwtManager = $jwtManager;
    }

    public function validateJwt($jwt)
    {
        try {
            $decodedToken = $this->encoder->decode($jwt);

            if (!$decodedToken) {
                throw new AuthenticationException('Invalid JWT token.');
            }

            $username = $decodedToken['username'];
            $user = $this->userProvider->loadUserByUsername($username);

            return $user;
        } catch (\Exception $e) {
            throw new AuthenticationException('Invalid JWT token.');
        }
    }
}