<?php

namespace App\Controller\Admin;

use App\Entity\Text;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class TextCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Text::class;
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
            ->setEntityLabelInSingular('Texte')
            ->setEntityLabelInPlural('Textes');
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            ChoiceField::new('page')->setLabel('Page')->setChoices(
                [
                    'Accueil' => 'Accueil',
                    'Qui sommes-nous' => 'Qui-sommes-nous',
                    'Prestations' => 'Prestations',
                    'Tarifs' => 'Tarifs',
                    'Contact' => 'Contact',
                ]
            )->setHelp("Titre de la page où le texte doit être inséré"),
            TextEditorField::new('text')->setLabel('Texte')->setHelp("Texte à insérer dans la page"),


        ];
    }
}
