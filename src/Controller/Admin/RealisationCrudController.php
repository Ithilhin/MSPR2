<?php

namespace App\Controller\Admin;

use App\Entity\Realisation;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class RealisationCrudController extends AbstractCrudController
{
    // Returns the class name of the entity this controller manages
    public static function getEntityFqcn(): string
    {
        return Realisation::class;
    }

    // Configures general settings for the CRUD interface of Realisations
    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            // Maximizes the content width for a more spacious layout
            ->renderContentMaximized()

            // Option to minimize the sidebar for a wider content area, uncomment if needed
            // ->renderSidebarMinimized()

            // Sets custom labels for singular and plural forms of the entity in the admin interface
            ->setEntityLabelInSingular('Réalisation')
            ->setEntityLabelInPlural('Réalisations');
    }

    // Defines which fields are displayed in the CRUD interface and their configurations
    public function configureFields(string $pageName): iterable
    {
        return [
            // Field for uploading project images with a custom file naming pattern
            ImageField::new('imageFileName')
                ->setLabel('Photographie')
                ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]')
                ->setBasePath('/uploads/images')->setUploadDir('public/uploads/images/')
                // Makes the field required only when creating a new Realisation entry
                ->setRequired($pageName === Crud::PAGE_NEW),

            // Field for the project title with a custom label and help text
            TextField::new('title')->setLabel('Titre')->setHelp('Type de réalisation'),

            // Text editor for detailed project description, shown only in forms
            TextEditorField::new('text')->setLabel('Description de la réalisation')->setHelp('Description de la réalisation effectuée')->onlyOnForms(),

            // Text field for a brief project description, formatted for display in listings
            TextField::new('text')->setLabel('Description')->setHelp('Description de la réalisation effectuée')->onlyOnIndex()->formatValue(function ($value) {
                // Custom formatting can be applied here if needed
                return $value;
            }),

            // Toggle field to control the visibility of the project on the homepage
            BooleanField::new('active')->setLabel('active')->setHelp("Afficher la réalisation sur la page d'acceuil"),
        ];
    }
}
