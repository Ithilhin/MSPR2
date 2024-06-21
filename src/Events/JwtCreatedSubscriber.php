<?php

// Déclaration de l'espace de noms pour JwtCreatedSubscriber
namespace App\Events;

// Importation des classes nécessaires
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

// Définition de la classe JwtCreatedSubscriber
class JwtCreatedSubscriber
{
    // Méthode déclenchée lors de la création d'un JWT
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        // Récupération de l'utilisateur à partir de l'événement
        /**
         * @var User
         */
        $user = $event->getUser();
        // Récupération des données du JWT
        $data = $event->getData();
        // Ajout du prénom de l'utilisateur aux données du JWT
        $data['firstName'] = $user->getFirstName();
        // Ajout du nom de l'utilisateur aux données du JWT
        $data['lastName'] = $user->getLastName();   
        // Mise à jour des données du JWT
        $event->setData($data);
        
    }
}