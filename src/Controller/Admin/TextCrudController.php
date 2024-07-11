<?php

namespace App\Controller\Admin;

use App\Entity\Text;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;


class TextCrudController extends AbstractCrudController
{
    // Returns the class name of the entity this controller manages
    public static function getEntityFqcn(): string
    {
        return Text::class;
    }

    // Configures general settings for the CRUD interface of Text entities
    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            // Enhances readability by using the full browser width for content
            ->renderContentMaximized()

            // Option to minimize the sidebar for a wider content area, uncomment if needed
            // ->renderSidebarMinimized()

            // Sets custom labels for singular and plural forms of the entity in the admin interface
            ->setEntityLabelInSingular('Texte')
            ->setEntityLabelInPlural('Textes');
    }

    // Defines which fields are displayed in the CRUD interface and their configurations
    public function configureFields(string $pageName): iterable
    {
        return [
            // Dropdown menu for selecting the page where the text will be displayed
            ChoiceField::new('page')->setLabel('Page')->setChoices(
                [
                    'Accueil' => 'Accueil',
                    'Qui sommes-nous' => 'Qui-sommes-nous',
                    'Prestations' => 'Prestations',
                    'Tarifs' => 'Tarifs',
                    'Contact' => 'Contact',
                ]
            )->setHelp("Titre de la page où le texte doit être inséré"),

            // Text editor for inputting the text content, available only in forms
            TextEditorField::new('text')->setLabel('Texte à afficher')->setHelp("Texte à insérer dans la page")->onlyOnForms(),

            // Text field for displaying the text content in listings, with custom formatting if needed
            TextField::new('text')->setLabel('Texte')->setHelp("Texte à insérer dans la page")->onlyOnIndex()->formatValue(function ($value) {
                // Custom formatting can be applied here if needed
                return $value;
            }),
        ];
    }

    // Configures actions available for Text entities in the admin interface
    public function configureActions(Actions $actions): Actions
    {
        return $actions
            // Disables the ability to create new Text entities
            ->disable(Action::NEW);
    }
}
