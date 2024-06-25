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
    public static function getEntityFqcn(): string
    {
        return Realisation::class;
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
            ->setEntityLabelInSingular('Réalisation')
            ->setEntityLabelInPlural('Réalisations')
        ;
    }
    
        
        public function configureFields(string $pageName): iterable
        {
            return [
                // TODO regler le pb quand on modifie de l'image qui est rouge
                
                ImageField::new('imageFileName')
                    ->setLabel('Photographie')
                    ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]')
                    ->setBasePath('/uploads/images')->setUploadDir('public/uploads/images/'),
                TextField::new('title')->setLabel('Titre')->setHelp('Type de réalisation'),
                TextEditorField::new('text')->setLabel('Description')->setHelp('Description de la réalisation effectuée'),
                BooleanField::new('active')->setLabel('active')->setHelp("Afficher la réalisation sur la page d'acceuil"),
            ];
        }
        
}
