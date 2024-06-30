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
    public static function getEntityFqcn(): string
    {
        return Image::class;
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
        ->setEntityLabelInSingular('Image')
        ->setEntityLabelInPlural('Images')
    ;
}

    
    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title')
                ->setLabel('Titre')
                ->setHelp("Titre de l'image"),
            TextField::new('alt')
                ->setLabel('description alternative')
                ->setHelp("description alternative de l'image pour l'accessibilité"),
            ImageField::new('src')
                ->setLabel('Image')
                ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]')
                ->setBasePath('/uploads/images')->setUploadDir('public/uploads/images/')
                ->setRequired($pageName === Crud::PAGE_NEW), 
            AssociationField::new('prestation')
                ->setLabel("Prestation associée à l'image"),
            BooleanField::new('active')->setLabel('active')->setHelp('Image affichée dans la page "Prestations"'),
        ];
    }
}
