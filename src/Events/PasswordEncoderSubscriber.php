<?php

namespace App\Events;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * The PasswordEncoderSubscriber class listens to Symfony events and handles password encoding for User entities.
 * It implements the EventSubscriberInterface to subscribe to specific events, particularly for encoding passwords before persisting users.
 */
class PasswordEncoderSubscriber implements EventSubscriberInterface
{
    /**
     * @var UserPasswordHasherInterface The password hasher service.
     */
    private $passwordEncoder;

    /**
     * Constructor to inject the password hasher service.
     * 
     * @param UserPasswordHasherInterface $passwordEncoder The service used for hashing passwords.
     */
    public function __construct(UserPasswordHasherInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * Specifies the events to which this subscriber wants to listen.
     * This method subscribes to the VIEW event with a priority to ensure it runs before the entity is written to the database.
     * 
     * @return array The array of events this subscriber listens to.
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * Encodes the password of a User entity before it's persisted to the database.
     * This method is triggered on the VIEW event, allowing us to intercept User entities and hash their passwords before saving.
     * 
     * @param ViewEvent $event The event instance containing the request and the entity.
     */
    public function encodePassword(ViewEvent $event)
    {
        // Retrieve the entity from the current ViewEvent.
        $user = $event->getControllerResult();

        // Check if the request method is POST to ensure we only encode passwords on user creation.
        $method = $event->getRequest()->getMethod();

        // If the entity is a User and the method is POST, proceed with password hashing.
        if ($user instanceof User && 'POST' === $method) {
            // Hash the user's plain password.
            $hash = $this->passwordEncoder->hashPassword($user, $user->getPassword());

            // Set the hashed password back on the User entity.
            $user->setPassword($hash);
        }
    }
}
