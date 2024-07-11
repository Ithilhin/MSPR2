<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\Contact;
use App\Entity\Image;
use App\Entity\ImageForCarousel;
use App\Entity\Prestation;
use App\Entity\Prices;
use App\Entity\Realisation;
use App\Entity\User;
use App\Entity\Text;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    /**
     * Encodeur de mot de passe
     * @var UserPasswordHasherInterface
     */
    private $encoder;

    /**
     * Constructor to inject the password hasher service.
     */
    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * Load data fixtures with the passed EntityManager.
     */
    public function load(ObjectManager $manager): void
    {
        // Initialize Faker for French data.
        $faker = \Faker\Factory::create('fr_FR');

        // Create 10 random users.
        for ($u = 0; $u < 10; $u++) {
            $user = new User();
            // Hash a default password for all users.
            $hash = $this->encoder->hashPassword($user, 'password');

            // Set user properties using Faker.
            $user->setFirstname($faker->firstName);
            $user->setLastname($faker->lastName);
            $user->setEmail($faker->email);
            $user->setTel($faker->phoneNumber);
            $user->setPassword($hash);
            $user->setRoles(['ROLE_USER']);

            // Persist user object for database insertion.
            $manager->persist($user);
        }

        // Create a specific user "Bob" with admin privileges.
        $Bob = new User();
        $hash = $this->encoder->hashPassword($Bob, 'password');

        // Manually set properties for Bob.
        $Bob->setFirstname("Bob");
        $Bob->setLastname($faker->lastName);
        $Bob->setEmail("bob@canopee.com");
        $Bob->setTel($faker->phoneNumber);
        $Bob->setPassword($hash);
        $Bob->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        $Bob->setTitle("BOB - Directeur Scientifique");
        $Bob->setDescription("Bob, co-fondateur de Canopées, est un biologiste passionné avec une expertise en botanique. Son engagement pour la biodiversité guide l'entreprise vers des pratiques écologiques.");
        $Bob->setPictureFileName("bob.jpeg");

        // Persist Bob for database insertion.
        $manager->persist($Bob);

        // Create a specific user "Tom" with admin privileges.
        $Tom = new User();
        $hash = $this->encoder->hashPassword($Tom, 'password');

        // Manually set properties for Tom.
        $Tom->setFirstname("Tom");
        $Tom->setLastname($faker->lastName);
        $Tom->setEmail("tom@canopee.com");
        $Tom->setTel($faker->phoneNumber);
        $Tom->setPassword($hash);
        $Tom->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        $Tom->setTitle("TOM - Directeur Créatif");
        $Tom->setDescription("Tom, co-fondateur, possède un solide background en paysagisme. Créatif et visionnaire, il transforme les espaces verts en œuvres d'art vivantes.");
        $Tom->setPictureFileName("tom.jpeg");

        // Persist Tom for database insertion.
        $manager->persist($Tom);

        // Setup clients: Create and configure 3 different types of clients (particulier, professionnel, collectivité).
        for ($c = 0; $c < 3; $c++) {
            $client = new Client();
            $client->setActive(TRUE); // Mark the client as active.
            $type = [
                'particulier', // Individual clients
                'professionnel', // Business clients
                'collectivité' // Community or governmental clients
            ];
            $client->setType($type[$c]); // Set the client type based on the iteration.

            switch ($type[$c]) {
                case 'particulier':
                    // Description for individual clients focusing on personal and aesthetic values.
                    $client->setDescription("Le client type de Canopées est un <span class='text-custom-green fw-bold'>particulier</span> passionné par la nature et soucieux de l'esthétique et de la santé de son espace extérieur.<br /> Souvent propriétaire d'une maison avec jardin, ce client valorise un espace vert bien entretenu qui non seulement embellit sa propriété mais crée aussi un havre de paix pour sa famille et lui.<br /> Il est conscient de l'importance de l'environnement et cherche des solutions écologiques pour l'entretien de son jardin.");
                    break;
                case 'professionnel':
                    // Description for business clients emphasizing their need for prestige and sustainable solutions.
                    $client->setDescription("Les clients <span class='text-custom-red fw-bold'>professionnels</span> de Canopées, soucieux de leur image, investissent dans des espaces verts pour renforcer leur prestige. Ils exigent des solutions durables qui allient esthétique et écologie. <br /> Ces responsables recherchent des services sur mesure, prioritaires pour l'accueil et le bien-être de leur clientèle. <br /> Ils valorisent l'écoresponsabilité, choisissant Canopées pour son engagement en faveur de la valorisation des déchets verts et de la préservation environnementale.");
                    break;
                case 'collectivité':
                    // Description for community/governmental clients highlighting their focus on public welfare and ecological initiatives.
                    $client->setDescription("Les <span class='text-custom-violet fw-bold'>collectivités territoriales</span> partenaires de Canopées visent à embellir les espaces publics, améliorant ainsi la qualité de vie des citoyens. Elles privilégient des projets verts durables. <br /> Ces administrations s'engagent dans des initiatives écologiques, cherchant à réduire l'empreinte environnementale à travers des pratiques de gestion durable des espaces verts.<br /> Elles valorisent la collaboration avec Canopées pour son expertise et son engagement envers des solutions respectueuses de l'environnement.");
                    break;
            };

            // Persist each client to the database.
            $manager->persist($client);
        }

        // Setup contacts: Generate and persist 10 contacts with random information.
        for ($co = 0; $co < 10; $co++) {
            $contact = new Contact();
            // Use Faker to generate random personal information for the contact.
            $contact->setFirstname($faker->firstName);
            $contact->setLastname($faker->lastName);
            $contact->setEmail($faker->email);
            $contact->setTel($faker->phoneNumber);
            // Set a default message for the contact expressing interest in services.
            $contact->setMessage("Bonjour, je suis intéressé par vos services. Pouvez-vous me contacter pour plus d'informations ?");
            // Persist the contact to the database.
            $manager->persist($contact);
        }

        // Setup prestations: Create and configure 5 different services with associated prices and images.
        for ($p = 1; $p < 6; $p++) {
            $prestation = new Prestation();
            $Price = new Prices();
            // Define a list of services offered.
            $prestations = [
                'Conception/Realisation',
                'Entretien',
                'Taille',
                'Élagage/Abattage',
                'Valorisation'
            ];
            // Set the title for the current service based on iteration.
            $prestation->setTitle($prestations[$p - 1]);
            // Persist the service to the database.
            $manager->persist($prestation);

            // Setup Prices: Associate a price model with the current service offering.
            $Price->setPrestation($prestation);
            // Generate a minimum price for the service using a random float between 10 and 100.
            $minPrice = $faker->randomFloat(2, 10, 100);
            // Generate a temporary mean price that is greater than the minimum price to ensure a realistic pricing model.
            $tempMeanPrice = $faker->randomFloat(2, $minPrice, 100);
            // Ensure the maximum price is strictly greater than the mean price by adding a small increment, thus maintaining a logical price range.
            $maxPrice = $faker->randomFloat(2, $tempMeanPrice + 0.01, 100 + 0.01);
            // Calculate the mean price to be strictly between the minimum and maximum prices, ensuring a balanced pricing strategy.
            $meanPrice = ($minPrice + $maxPrice) / 2;
            // Set the calculated prices for the service to provide detailed pricing information.
            $Price->setMinPrice($minPrice);
            $Price->setMeanPrice($meanPrice);
            $Price->setMaxPrice($maxPrice);
            // Persist the price model to the database.
            $manager->persist($Price);

            // Setup Images: Create and persist images related to the service.
            for ($i = 1; $i < 6; $i++) {
                $image = new Image();
                // Set the source path for the image, dynamically generating the filename based on the service number and image number.
                $image->setSrc('presta' . $p . $i . '.jpg');
                // Set an alternative text for the image, describing the associated service.
                $image->setalt("Prestation : " . $prestations[$p - 1]);
                // Set a title for the image, providing additional context.
                $image->setTitle("Image prestation " . $p . $i);
                // Associate the image with the corresponding service.
                $image->setPrestation($prestation);
                // Mark the image as active, indicating it should be displayed.
                $image->setActive(TRUE);
                // Persist the image to the database.
                $manager->persist($image);
            }
        }

        // Setup Texts: Create and persist text content for different pages of the site.
        $page = [
            'Accueil', // Home page
            'Qui-sommes-nous', // About us page
            'Prestations', // Services page
            'Tarifs', // Pricing page
            'Contact' // Contact page
        ];

        for ($i = 0; $i < count($page); $i++) {
            $text = new Text();
            // Use a switch statement to set the text content based on the page.
            switch ($page[$i]) {
                case "Accueil":
                    // Set a welcoming text for the Home and About Us pages, detailing the company's mission and services.
                    $text->setText("Bienvenue sur le site de Canopées, votre partenaire privilégié pour la conception, la réalisation, et l'entretien d'espaces verts. Fondée en 2020 par Bob et Tom, deux passionnés de la nature, notre société s'engage à offrir des services de qualité pour embellir vos extérieurs, que vous soyez particuliers, professionnels ou collectivités territoriales. Chez Canopées, nous croyons fermement que chaque espace vert a le potentiel de devenir un petit coin de paradis. Nos services sont conçus pour transformer cette vision en réalité.<br /> Notre engagement envers l'environnement se reflète également dans notre charte graphique, inspirée de la valorisation des déchets verts. Nous pratiquons le compostage des déchets issus de nos activités, réduisant ainsi l'impact environnemental et enrichissant la terre que nous chérissons tant.<br /> Explorez notre site pour découvrir davantage sur nos services et comment nous pouvons vous aider à réaliser le jardin de vos rêves. Chez Canopées, nous sommes dédiés à la beauté de vos espaces extérieurs et à la préservation de notre planète. Contactez-nous dès aujourd'hui pour faire le premier pas vers la création ou l'entretien de votre espace vert idéal.");
                    break;
                case "Qui-sommes-nous":
                    // Set a welcoming text for the Home and About Us pages, detailing the company's mission and services.
                    $text->setText("Bienvenue sur le site de Canopées, votre partenaire privilégié pour la conception, la réalisation, et l'entretien d'espaces verts. Fondée en 2020 par Bob et Tom, deux passionnés de la nature, notre société s'engage à offrir des services de qualité pour embellir vos extérieurs, que vous soyez particuliers, professionnels ou collectivités territoriales. Chez Canopées, nous croyons fermement que chaque espace vert a le potentiel de devenir un petit coin de paradis. Nos services sont conçus pour transformer cette vision en réalité.<br /> Notre engagement envers l'environnement se reflète également dans notre charte graphique, inspirée de la valorisation des déchets verts. Nous pratiquons le compostage des déchets issus de nos activités, réduisant ainsi l'impact environnemental et enrichissant la terre que nous chérissons tant.<br /> Explorez notre site pour découvrir davantage sur nos services et comment nous pouvons vous aider à réaliser le jardin de vos rêves. Chez Canopées, nous sommes dédiés à la beauté de vos espaces extérieurs et à la préservation de notre planète. Contactez-nous dès aujourd'hui pour faire le premier pas vers la création ou l'entretien de votre espace vert idéal.");
                    break;
                case "Prestations":
                    // The text for the Services page will be set here.
                    $text->setText("");
                    break;
                case "Tarifs":
                    // The text for the Pricing page will be set here.
                    $text->setText("");
                    break;
                case "Contact":
                    // Set a detailed contact form instruction text, including data handling policies.
                    $text->setText("
                    * Champs obligatoires
                    ** Les données personnelles communiquées sont nécessaires aux fins de vous contacter. Elles sont destinées à Acrocimes élagage et ses sous-traitants. Vous disposez de droits d’accès, de rectification, d’effacement, de portabilité, de limitation, d’opposition, de retrait de votre consentement à tout moment et du droit d’introduire une réclamation auprès d’une autorité de contrôle, ainsi que d’organiser le sort de vos données post-mortem. Vous pouvez exercer ces droits par voie postale à l'adresse 24 Rue Anatole France, 66670 Bages, France, ou par courrier électronique à l'adresse contact@acrocimes-elagage.fr. Un justificatif d'identité pourra vous être demandé. Nous conservons vos données pendant la période de prise de contact puis pendant la durée de prescription légale aux fins probatoires et de gestion des contentieux.");
                    break;
                default:
                    // Fallback text for any unknown pages.
                    $text->setText("Page inconnue");
                    break;
            }
            // Associate the text with the corresponding page.
            $text->setPage($page[$i]);
            // Persist the text content to the database.
            $manager->persist($text);
        }

        // Setup réalisations: Creating and persisting realisation entities to showcase different projects.

        // Create and setup the first realisation with title, description, activation status, and image filename.
        $realisation1 = new Realisation();
        $realisation1->setTitle("JARDIN À MURETS ET PAREMENT EN PIERRE ÉTAGÉS");
        $realisation1->setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis");
        $realisation1->setActive(TRUE);
        $realisation1->setImageFileName('rea1.jpg');
        $manager->persist($realisation1);
        // Repeat the process for other realisations, each with unique titles, descriptions, and images.
        $realisation2 = new Realisation();
        $realisation2->setTitle("AMÉNAGEMENT DE JARDIN À SAINT AMAND LES EAUX");
        $realisation2->setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis");
        $realisation2->setActive(TRUE);
        $realisation2->setImageFileName('rea2.jpg');
        $manager->persist($realisation2);

        $realisation3 = new Realisation();
        $realisation3->setTitle("RÉNOVATION : UN JARDIN PROVENCAL SE REDÉPLOIE AUTOUR DE SON MAS");
        $realisation3->setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis");
        $realisation3->setActive(TRUE);
        $realisation3->setImageFileName('rea3.jpg');
        $manager->persist($realisation3);

        $realisation4 = new Realisation();
        $realisation4->setTitle("JARDIN À MURETS ET PAREMENT EN PIERRE ÉTAGÉS");
        $realisation4->setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio");
        $realisation4->setActive(TRUE);
        $realisation4->setImageFileName('rea2.jpg');
        $manager->persist($realisation4);

        $realisation5 = new Realisation();
        $realisation5->setTitle("AMÉNAGEMENT DE JARDIN À SAINT AMAND LES EAUX");
        $realisation5->setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e");
        $realisation5->setActive(TRUE);
        $realisation5->setImageFileName('rea3.jpg');
        $manager->persist($realisation5);

        $realisation6 = new Realisation();
        $realisation6->setTitle("RÉNOVATION : UN JARDIN PROVENCAL SE REDÉPLOIE AUTOUR DE SON MAS");
        $realisation6->setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqu");
        $realisation6->setActive(TRUE);
        $realisation6->setImageFileName('rea1.jpg');
        $manager->persist($realisation6);

        // Setup Images for Carousel: Creating and persisting images for a carousel feature on the website.
        for ($i = 0; $i < 4; $i++) {
            $imageCarousel = new ImageForCarousel();
            $imageCarousel->setSrc('carousel' . ($i + 1) . '.jpg'); // Set the source path for the carousel image, dynamically generating the filename.
            $imageCarousel->setalt("Carousel : " . ($i + 1)); // Set an alternative text for the image, useful for accessibility and SEO.
            $imageCarousel->setActive(TRUE); // Mark the carousel image as active for display.
            $manager->persist($imageCarousel); // Persist the carousel image entity to the database.
        }

        // Finalize all persist operations by flushing the manager, effectively saving all changes to the database.
        $manager->flush();
    }
}
