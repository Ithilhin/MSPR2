<?php

namespace App\Controller\Admin;

use App\Entity\Contact;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

// Defines a CRUD controller for the Contact entity using EasyAdminBundle
class ContactCrudController extends AbstractCrudController
{
    // Returns the fully qualified class name of the entity this CRUD controller manages
    public static function getEntityFqcn(): string
    {
        return Contact::class;
    }

    // Configures options for the CRUD interface
    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            // Maximizes the content width for better readability and usability
            ->renderContentMaximized()

            // Uncomment the following line to minimize the sidebar for a wider content area
            // ->renderSidebarMinimized()

            // Sets custom labels for the entity in the admin interface
            ->setEntityLabelInSingular('Message')
            ->setEntityLabelInPlural('Messages');
    }

    // Defines the fields to be displayed in the CRUD forms and listings
    public function configureFields(string $pageName): iterable
    {
        return [
            // Defines a text field for the last name with a custom label and help text
            TextField::new('lastName')->setLabel('Nom de Famille')->setHelp('Nom de famille du client'),

            // Defines a text field for the first name with a custom label and help text
            TextField::new('firstName')->setLabel('Prénom')->setHelp('Prénom du client'),

            // Defines a text field for the email, shown only in forms
            TextField::new('email')->setLabel('Email')->setHelp('Email du client')->onlyOnForms(),

            // Defines a text field for the telephone number, shown only in forms
            TextField::new('tel')->setLabel('Téléphone')->setHelp('Téléphone du client')->onlyOnForms(),

            // Defines a text editor field for the message, shown only in forms
            TextEditorField::new('message')->setLabel('Message')->setHelp('Message du client')->onlyOnForms(),

            // Defines a text field for the message, formatted for display in listings
            TextField::new('message')->setLabel('Message du client')->setHelp("Texte à insérer dans la page")->onlyOnIndex()->formatValue(function ($value) {
                return $value; // Custom formatting can be applied here
            }),
        ];
    }

    // Configures actions available for this CRUD controller
    public function configureActions(Actions $actions): Actions
    {
        return $actions
            // Disable the 'new' action to remove the ability to create new Contacts
            ->disable(Action::NEW);
    }
}
