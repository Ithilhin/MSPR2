<?php

// Déclaration de l'espace de noms pour le fichier CurrentUserExtension
namespace App\Doctrine;

// Importation des classes nécessaires depuis divers paquets
use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Client;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

// Définition de la classe CurrentUserExtension qui implémente deux interfaces pour modifier les requêtes
class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface {
    
    // Déclaration des propriétés pour la sécurité et la vérification des autorisations
    private $security;
    private $authChecker;

    // Constructeur de la classe avec injection de dépendances pour Security et AuthorizationCheckerInterface
    public function __construct(Security $security, AuthorizationCheckerInterface $authChecker)
    {
        $this->security = $security; // Initialisation de la propriété security
        $this->authChecker = $authChecker; // Initialisation de la propriété authChecker
    }

    // Méthode privée pour ajouter une condition WHERE à la requête, basée sur la classe de ressource
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        $user = $this->security->getUser(); // Récupération de l'utilisateur actuel
        // Vérification si la classe de ressource est Client et si l'utilisateur n'a pas le rôle ADMIN
        if ($resourceClass === Client::class && !$this->authChecker->isGranted('ROLE_ADMIN')) {
            $rootAlias = $queryBuilder->getRootAliases()[0]; // Récupération de l'alias racine de la requête
            // Exemple de filtrage par utilisateur, à personnaliser selon les besoins
            $queryBuilder->andWhere(sprintf('%s.user = :current_user', $rootAlias));
            $queryBuilder->setParameter('current_user', $user);
            // Exemple de filtrage par id, à personnaliser selon les besoins
            $queryBuilder->andWhere(sprintf('%s.id = 84', $rootAlias)); // Filtrage par id fixe pour l'exemple
            
        }
    }

    // Méthode pour appliquer la condition WHERE aux collections de ressources
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass); // Appel de addWhere avec la classe de ressource
    }
    // Méthode pour appliquer la condition WHERE aux éléments individuels de ressources
    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass); // Appel de addWhere avec la classe de ressource
    }
}