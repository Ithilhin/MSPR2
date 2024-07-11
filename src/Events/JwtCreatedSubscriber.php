<?php

// Namespace declaration for JwtCreatedSubscriber.
namespace App\Events;

// Importing necessary classes.
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

/**
 * JwtCreatedSubscriber listens to JWT creation events.
 * It customizes the JWT payload by adding additional user information.
 */
class JwtCreatedSubscriber
{
    /**
     * Event listener for when a JWT is created.
     * This method enriches the JWT payload with the user's first and last names.
     *
     * @param JWTCreatedEvent $event The event object containing JWT and user information.
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        // Retrieve the User entity from the event.
        /**
         * @var User $user The user for whom the JWT is being created.
         */
        $user = $event->getUser();

        // Retrieve the initial data intended for the JWT payload.
        $data = $event->getData();

        // Add the user's first name to the JWT payload.
        $data['firstName'] = $user->getFirstName();

        // Add the user's last name to the JWT payload.
        $data['lastName'] = $user->getLastName();

        // Update the JWT payload with the modified data.
        $event->setData($data);
    }
}
