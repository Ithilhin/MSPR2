<?php

namespace App\Events;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

// La classe PasswordEncoderSubscriber implémente l'interface EventSubscriberInterface pour écouter les événements Symfony

class PasswordEncoderSubscriber implements EventSubscriberInterface
{
    // Propriété pour stocker le service de hachage de mot de passe
    /**
     * Encodeur de mot de passe
     * @var UserPasswordHasherInterface
     */
    private $passwordEncoder;

    // Constructeur pour injecter le service de hachage de mot de passe
    public function __construct(UserPasswordHasherInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    // Méthode pour s'abonner aux événements, ici à l'événement VIEW pour exécuter une action avant l'écriture dans la base de données
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }
    // Méthode appelée lors de l'événement VIEW pour hacher le mot de passe de l'utilisateur avant de le sauvegarder
    public function encodePassword(ViewEvent $event)
    {
        // Récupère l'entité (User) à partir du contrôleur
        $user = $event->getControllerResult();
        // Vérifie la méthode de la requête (doit être POST pour hacher le mot de passe)
        $method = $event->getRequest()->getMethod();
        // Si l'entité est un User et que la méthode est POST, hache le mot de passe et le définit pour l'utilisateur
        if ($user instanceof User && 'POST' === $method) {
            // Hache le mot de passe de l'utilisateur
            $hash = $this->passwordEncoder->hashPassword($user, $user->getPassword());
            // Définit le mot de passe haché pour l'utilisateur
            $user->setPassword($hash);
        }
    }
}