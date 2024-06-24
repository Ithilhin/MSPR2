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
    private $authorizationChecker;

    public function __construct(AuthorizationCheckerInterface $authorizationChecker)
    {
        $this->authorizationChecker = $authorizationChecker;
    }
    
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureCrud(Crud $crud): Crud
{
    return $crud
        // set this option if you prefer the page content to span the entire
        // browser width, instead of the default design which sets a max width
        ->renderContentMaximized()

        // set this option if you prefer the sidebar (which contains the main menu)
        // to be displayed as a narrow column instead of the default expanded design
        // ->renderSidebarMinimized()
        // the labels used to refer to this entity in titles, buttons, etc.
        ->setEntityLabelInSingular('Utilisateur')
        ->setEntityLabelInPlural('Utilisateurs')
    ;
}

    
    public function configureFields(string $pageName): iterable
    {
        $fields =[
            TextField::new('firstname')
                ->setLabel('Prénom'),
            TextField::new('lastname')
                ->setLabel('Nom'),
            TextField::new('email')
                ->setLabel('Email')
                ->onlyOnIndex(),
            TextField::new('tel')
                ->setLabel('Téléphone'),
            ChoiceField::new('roles')
                ->setLabel('Permissions')
                ->setChoices(
                    [
                        'Utilisateur' => "ROLE_USER",
                        'Administrateur' => "ROLE_ADMIN",
                    ])
                ->allowMultipleChoices()
                ->setHelp("Les autorisations d'accès de l'utilisateur"),
                ];
        if ($this->authorizationChecker->isGranted('ROLE_ADMIN')){  
            $fields[] = 
                TextField::new('title')
                    ->setLabel('Titre')
                    ->setHelp("Titre de l'utilisateur");
                TextEditorField::new('description')
                    ->setLabel('Description')
                    ->setHelp("Description de l'utilisateur");
                ImageField::new('pictureFileName')
                    ->setLabel('Photographie')
                    ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]')
                    ->setBasePath('/uploads/images')->setUploadDir('public/uploads/images/');
        }
        return $fields;
    }
    
}
