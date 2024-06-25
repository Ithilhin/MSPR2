<?php

namespace App\Controller\Admin;

use App\Entity\Client;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;


class ClientCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Client::class;
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
        ->setEntityLabelInSingular('Client')
        ->setEntityLabelInPlural('Clients')
    ;
}

    
    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('Type')->setLabel('Type de client')->setHelp('Example: particulier, professionnel, collectivité'),
            TextEditorField::new('description')->setLabel('Description')->setHelp('Texte de description du client'),
            BooleanField::new('active')->setLabel('actif')->setHelp('Client actif ou non actif'),
        ];
    }
    
}
