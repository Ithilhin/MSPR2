<?php

namespace App\Service;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;

/**
 * JwtTokenService is responsible for handling JWT token operations such as validation.
 */
class JwtTokenService
{
    private $encoder; // Encoder for JWT operations.
    private $userProvider; // User provider for loading user details.
    private $jwtManager; // JWT Manager for token management.

    /**
     * Constructor for JwtTokenService.
     * 
     * @param JWTEncoderInterface $encoder Encoder for JWT.
     * @param UserProviderInterface $userProvider User provider for loading user entities.
     * @param JWTManager $jwtManager JWT Manager for managing tokens.
     */
    public function __construct(JWTEncoderInterface $encoder, UserProviderInterface $userProvider, JWTManager $jwtManager)
    {
        $this->encoder = $encoder;
        $this->userProvider = $userProvider;
        $this->jwtManager = $jwtManager;
    }

    /**
     * Validates a JWT token and returns the associated user.
     * 
     * @param string $jwt The JWT token to validate.
     * @return UserInterface The user associated with the validated token.
     * @throws AuthenticationException If the token is invalid or the user cannot be found.
     */
    public function validateJwt($jwt)
    {
        try {
            // Decode the JWT token.
            $decodedToken = $this->encoder->decode($jwt);

            // If decoding fails or returns false, throw an exception.
            if (!$decodedToken) {
                throw new AuthenticationException('Invalid JWT token.');
            }

            // Extract username from the decoded token.
            $username = $decodedToken['username'];
            // Load the user by username.
            $user = $this->userProvider->loadUserByUsername($username);

            // Return the loaded user.
            return $user;
        } catch (\Exception $e) {
            // In case of any exception, rethrow as an AuthenticationException.
            throw new AuthenticationException('Invalid JWT token.');
        }
    }
}
