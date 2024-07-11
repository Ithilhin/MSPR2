<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

// Define AppController class extending the base AbstractController for common controller features
class AppController extends AbstractController
{
    // Define a route for the application's homepage using PHP 8 Attributes
    #[Route('/', name: 'app_app')]
    public function index(): Response
    {
        // Render and return the 'app/index.html.twig' template as the response for the homepage
        return $this->render('app/index.html.twig', []);
    }
}
