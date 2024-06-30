<?php

namespace App\Controller\Admin;

use App\Entity\ImageForCarousel;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;



class ImageForCarouselCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return ImageForCarousel::class;
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
            ->setEntityLabelInSingular('Image pour carroussel')
            ->setEntityLabelInPlural('Images pour carroussel');
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('alt')
                ->setLabel('description alternative')
                ->setHelp("description alternative de l'image pour l'accessibilité"),
            ImageField::new('src')
                ->setLabel('Image')
                ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]')
                ->setBasePath('/uploads/images')->setUploadDir('public/uploads/images/')
                ->setRequired($pageName === Crud::PAGE_NEW), 
            BooleanField::new('active')->setLabel('active')->setHelp('Image affichée dans la page "Prestations"'),
        ];
    }
}
