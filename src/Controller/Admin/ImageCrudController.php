<?php

namespace App\Controller\Admin;

use App\Entity\Image;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ImageCrudController extends AbstractCrudController
{
    // Returns the fully qualified class name of the entity this CRUD controller manages
    public static function getEntityFqcn(): string
    {
        return Image::class;
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
            ->setEntityLabelInSingular('Image')
            ->setEntityLabelInPlural('Images');
    }

    // Defines the fields to be displayed in the CRUD forms and listings
    public function configureFields(string $pageName): iterable
    {
        return [
            // Defines a text field for the image title with a custom label and help text
            TextField::new('title')
                ->setLabel('Titre')
                ->setHelp("Titre de l'image"),

            // Defines a text field for the alternative description of the image for accessibility purposes
            TextField::new('alt')
                ->setLabel('description alternative')
                ->setHelp("description alternative de l'image pour l'accessibilité"),

            // Defines an image field for uploading images, with custom configurations for file naming and storage
            ImageField::new('src')
                ->setLabel('Image')
                ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]')
                ->setBasePath('/uploads/images')
                ->setUploadDir('public/uploads/images/')
                // Makes the image field required only when creating a new record
                ->setRequired($pageName === Crud::PAGE_NEW),

            // Defines an association field for linking images to a specific prestation (service)
            AssociationField::new('prestation')
                ->setLabel("Prestation associée à l'image"),

            // Defines a boolean field to toggle the visibility of the image in the "Prestations" page
            BooleanField::new('active')
                ->setLabel('active')
                ->setHelp('Image affichée dans la page "Prestations"'),
        ];
    }
}
