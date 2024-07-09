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
    public static function getEntityFqcn(): string
    {
        return Prestation::class;
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
            ->setEntityLabelInSingular('Prestation')
            ->setEntityLabelInPlural('Prestations');
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('Title')->setLabel('Type de prestation')->setHelp('Titre de la prestation'),
            NumberField::new('prices.minPrice')->setLabel('Prix minimum')
                ->formatValue(function ($value, $entity) {
                    return number_format($entity->getPrices()->getMinPrice(), 2, ',', '') . ' €/h';
                }),
            NumberField::new('prices.meanPrice')->setLabel('Prix moyen')
                ->formatValue(function ($value, $entity) {
                    return number_format($entity->getPrices()->getMeanPrice(), 2, ',', '') . ' €/h';
                }),
            NumberField::new('prices.maxPrice')->setLabel('Prix maximum')
                ->formatValue(function ($value, $entity) {
                    return number_format($entity->getPrices()->getMaxPrice(), 2, ',', '') . ' €/h';
                }),
        ];
    }
    public function configureActions(Actions $actions): Actions
    {
        return $actions
            // Disable the 'new' action to remove the ability to create new Prestations
            ->disable(Action::NEW);
    }
}
