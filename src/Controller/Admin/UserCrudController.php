<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class UserCrudController extends AbstractCrudController
{
    // AuthorizationCheckerInterface instance for checking user permissions
    private $authorizationChecker;

    // Constructor to inject the AuthorizationCheckerInterface dependency
    public function __construct(AuthorizationCheckerInterface $authorizationChecker)
    {
        $this->authorizationChecker = $authorizationChecker;
    }

    // Returns the class name of the entity this controller manages
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    // Configures general settings for the CRUD interface of User entities
    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            // Option to use the full browser width for the CRUD interface
            ->renderContentMaximized()

            // Option to display the sidebar as a narrow column, uncomment if preferred
            // ->renderSidebarMinimized()

            // Sets custom labels for singular and plural forms of the entity
            ->setEntityLabelInSingular('Utilisateur')
            ->setEntityLabelInPlural('Utilisateurs');
    }

    // Defines which fields are displayed in the CRUD interface and their configurations
    public function configureFields(string $pageName): iterable
    {
        $fields = [
            // Field for the user's first name
            TextField::new('firstname')
                ->setLabel('Prénom'),

            // Field for the user's last name
            TextField::new('lastname')
                ->setLabel('Nom'),

            // Field for the user's email address
            TextField::new('email')
                ->setLabel('Email'),

            // Field for the user's telephone number
            TextField::new('tel')
                ->setLabel('Téléphone'),

            // Dropdown for assigning roles to the user
            ChoiceField::new('roles')
                ->setLabel('Permissions')
                ->setChoices(
                    [
                        'Utilisateur' => "ROLE_USER",
                        'Administrateur' => "ROLE_ADMIN",
                    ]
                )
                ->allowMultipleChoices()
                ->setHelp("Les autorisations d'accès de l'utilisateur"),

            // Field for the user's password, only shown when creating a new user
            Textfield::new('password')
                ->setLabel('Mot de passe')
                ->setHelp("Mot de passe de l'utilisateur")
                ->onlyWhenCreating(),
        ];
        // Conditional block to add additional fields for users with 'ROLE_ADMIN' permissions
        if ($this->authorizationChecker->isGranted('ROLE_ADMIN')) {
            // Adds a TextField for the user's title, visible only on forms
            // This field is intended for specifying the user's role or position for display on the 'About Us' page
            $fields[] = TextField::new('title')
                ->setLabel('Titre')
                ->setHelp("Titre de l'utilisateur, seulement pour la page 'Qui sommes-nous'")
                ->onlyOnForms()
                ->formatValue(function ($value) {
                    // Ensures the title field is never empty by providing a default space if no value is entered
                    return !empty($value) ? $value : ' ';
                });

            // Adds a TextEditorField for the user's description, visible only on forms
            // This field allows for a detailed description of the user's role, background, or other relevant information for the 'About Us' page
            $fields[] = TextEditorField::new('description')
                ->setLabel('Description')
                ->setHelp("Description de l'utilisateur, seulement pour la page 'Qui sommes-nous'")
                ->onlyOnForms();

            // Adds an ImageField for the user's photograph, configured for file upload and visible only on forms
            // This field is used to upload and store a photograph of the user, primarily for display on the 'About Us' page
            $fields[] = ImageField::new('picturefilename')
                ->setLabel("Photographie")
                ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]')
                ->setBasePath('/uploads/images')->setUploadDir('public/uploads/images/')
                ->onlyOnForms()
                ->setHelp("Photographie de l'utilisateur, seulement pour la page 'Qui sommes-nous'");
        }
        // Returns the array of fields to be used in the CRUD interface
        return $fields;
    }
}
