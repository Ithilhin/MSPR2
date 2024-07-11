<?php

namespace App\Controller\Admin;

use App\Entity\Contact;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ContactCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Contact::class;
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
            ->setEntityLabelInSingular('Message')
            ->setEntityLabelInPlural('Messages')
        ;
    }
    
        
        public function configureFields(string $pageName): iterable
        {
            return [
                TextField::new('lastName')->setLabel('Nom de Famille')->setHelp('Nom de famille du client'),
                TextField::new('firstName')->setLabel('Prénom')->setHelp('Prénom du client'),
                TextField::new('email')->setLabel('Email')->setHelp('Email du client')->onlyOnForms(),
                TextField::new('tel')->setLabel('Téléphone')->setHelp('Téléphone du client')->onlyOnForms(),
                TextEditorField::new('message')->setLabel('Message')->setHelp('Message du client')->onlyOnForms(), 
                TextField::new('message')->setLabel('Message du client')->setHelp("Texte à insérer dans la page")->onlyOnIndex()->formatValue(function ($value) {
                    return $value;
                }),            
            ];
        }
        public function configureActions(Actions $actions): Actions
    {
        return $actions
            // Disable the 'new' action to remove the ability to create new Prestations
            ->disable(Action::NEW);
    }
}
