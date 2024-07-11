<?php

namespace App\Controller\Admin;

use App\Entity\Prestation;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;




class PrestationCrudController extends AbstractCrudController
{
    // Returns the class name of the entity this controller manages
    public static function getEntityFqcn(): string
    {
        return Prestation::class;
    }

    // Configures general settings for the CRUD interface of Prestations
    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            // Maximizes the content width for a more spacious layout
            ->renderContentMaximized()

            // Uncomment below to display the sidebar as a narrow column, providing more space for content
            // ->renderSidebarMinimized()

            // Sets custom labels for this entity in the admin interface
            ->setEntityLabelInSingular('Prestation')
            ->setEntityLabelInPlural('Prestations');
    }

    // Defines which fields are displayed in the CRUD interface and their configurations
    public function configureFields(string $pageName): iterable
    {
        return [
            // Field for the title of the prestation, with a custom label and help text
            TextField::new('Title')->setLabel('Type de prestation')->setHelp('Titre de la prestation'),

            // Custom formatted number field for displaying the minimum price
            NumberField::new('prices.minPrice')->setLabel('Prix minimum')
                ->formatValue(function ($value, $entity) {
                    // Formats the minimum price value as a currency
                    return number_format($entity->getPrices()->getMinPrice(), 2, ',', '') . ' €/h';
                }),

            // Custom formatted number field for displaying the mean price
            NumberField::new('prices.meanPrice')->setLabel('Prix moyen')
                ->formatValue(function ($value, $entity) {
                    // Formats the mean price value as a currency
                    return number_format($entity->getPrices()->getMeanPrice(), 2, ',', '') . ' €/h';
                }),

            // Custom formatted number field for displaying the maximum price
            NumberField::new('prices.maxPrice')->setLabel('Prix maximum')
                ->formatValue(function ($value, $entity) {
                    // Formats the maximum price value as a currency
                    return number_format($entity->getPrices()->getMaxPrice(), 2, ',', '') . ' €/h';
                }),
        ];
    }

    // Configures actions available for Prestations in the admin interface
    public function configureActions(Actions $actions): Actions
    {
        return $actions
            // Disables the ability to create new Prestation entries
            ->disable(Action::NEW);
    }
}
