<?php

namespace App\Controller\Admin;

use App\Entity\Client;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

// Defines a CRUD controller for the Client entity using EasyAdminBundle
class ClientCrudController extends AbstractCrudController
{
    // Specifies the fully qualified class name (FQCN) of the entity this CRUD controller manages
    public static function getEntityFqcn(): string
    {
        return Client::class;
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
            ->setEntityLabelInSingular('Client')
            ->setEntityLabelInPlural('Clients');
    }

    // Defines the fields to be displayed in the CRUD forms and listings
    public function configureFields(string $pageName): iterable
    {
        return [
            // Defines a text field for the client type with a custom label and help text
            TextField::new('Type')->setLabel('Type de client')->setHelp('Example: particulier, professionnel, collectivité'),

            // Defines a text editor field for the client description, shown only in forms
            TextEditorField::new('description')->setLabel('Description')->setHelp('Texte de description du client')->onlyOnForms(),

            // Defines a text field for the client description, formatted for display in listings
            TextField::new('description')->setLabel('Description')->setHelp('Texte de description du client')->onlyOnIndex()->formatValue(function ($value) {
                return $value; // Custom formatting can be applied here
            }),

            // Defines a boolean field to indicate if the client is active, with a custom label and help text
            BooleanField::new('active')->setLabel('actif')->setHelp('Client actif ou non actif'),
        ];
    }
}
