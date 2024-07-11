<?php

namespace App\Controller\Admin;

use App\Entity\ImageForCarousel;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;



// Defines a CRUD controller for managing images in the carousel
class ImageForCarouselCrudController extends AbstractCrudController
{
    // Specifies the entity class this controller is associated with
    public static function getEntityFqcn(): string
    {
        return ImageForCarousel::class;
    }

    // Configures general CRUD settings for this entity
    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            // Enhances readability by using the full browser width for content
            ->renderContentMaximized()

            // Uncomment below to display the sidebar as a narrow column
            // ->renderSidebarMinimized()

            // Sets custom labels for singular and plural forms of the entity
            ->setEntityLabelInSingular('Image pour carroussel')
            ->setEntityLabelInPlural('Images pour carroussel');
    }

    // Defines which fields are displayed and how they are configured in the CRUD interface
    public function configureFields(string $pageName): iterable
    {
        return [
            // Field for the image's alternative text, enhancing accessibility
            TextField::new('alt')
                ->setLabel('description alternative')
                ->setHelp("description alternative de l'image pour l'accessibilité"),

            // Field for uploading the image, with custom file naming and storage settings
            ImageField::new('src')
                ->setLabel('Image')
                ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]')
                ->setBasePath('/uploads/images')->setUploadDir('public/uploads/images/')
                // Makes the field required only when creating a new image entry
                ->setRequired($pageName === Crud::PAGE_NEW),

            // Toggle field to control the visibility of the image in the carousel
            BooleanField::new('active')
                ->setLabel('active')
                ->setHelp('Image affichée dans la page "Prestations"'),
        ];
    }
}
