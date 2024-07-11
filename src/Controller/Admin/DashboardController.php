<?php

namespace App\Controller\Admin;

use App\Entity\Client;
use App\Entity\Contact;
use App\Entity\Image;
use App\Entity\ImageForCarousel;
use App\Entity\Prestation;
use App\Entity\Realisation;
use App\Entity\Text;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {


        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(UserCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        // Sets the title of the dashboard in the admin panel
        return Dashboard::new()
            ->setTitle('Canopées');
    }

    public function configureMenuItems(): iterable
    {
        // Configures menu items for the admin dashboard
        // Each line represents a link in the dashboard menu to manage different entities

        // Link to manage Users
        yield MenuItem::linkToCrud('Utilisateurs', 'fas fa-list', User::class);
        // Link to manage Carousel Images
        yield MenuItem::linkToCrud('Images pour carroussel', 'fas fa-list', ImageForCarousel::class);
        // Link to manage Editable Texts
        yield MenuItem::linkToCrud('Textes modifiables', 'fas fa-list', Text::class);
        // Link to manage Client Types
        yield MenuItem::linkToCrud('Clients types', 'fas fa-list', Client::class);
        // Link to manage Realizations
        yield MenuItem::linkToCrud('Réalisations', 'fas fa-list', Realisation::class);
        // Link to manage Services
        yield MenuItem::linkToCrud('Prestations', 'fas fa-list', Prestation::class);
        // Link to manage Service Images
        yield MenuItem::linkToCrud('Images des prestations', 'fas fa-list', Image::class);
        // Link to manage Messages
        yield MenuItem::linkToCrud('Messages', 'fas fa-list', Contact::class);

        // Adds a link to return to the front homepage from the admin dashboard
        yield MenuItem::linkToUrl("Page D'acceuil du site", 'fas fa-home', '/#');
    }
}
