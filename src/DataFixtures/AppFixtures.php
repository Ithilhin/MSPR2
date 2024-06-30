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

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');

        // Setup user
        for ($u = 0; $u < 10; $u++) {
            $user = new User();
            $hash = $this->encoder->hashPassword($user, 'password');

            $user->setFirstname($faker->firstName);
            $user->setLastname($faker->lastName);
            $user->setEmail($faker->email);
            $user->setTel($faker->phoneNumber);
            $user->setPassword($hash);
            $user->setRoles(['ROLE_USER']);
            $manager->persist($user);
        }

        //  Setup Bob et Tom
        $Bob = new User();
        $hash = $this->encoder->hashPassword($Bob, 'password');

        $Bob->setFirstname("Bob");
        $Bob->setLastname($faker->lastName);
        $Bob->setEmail("bob@canopee.com");
        $Bob->setTel($faker->phoneNumber);
        $Bob->setPassword($hash);
        $Bob->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        $Bob->setTitle("BOB - Directeur Scientifique");
        $Bob->setDescription("Bob, co-fondateur de Canopées, est un biologiste passionné avec une expertise en botanique. Son engagement pour la biodiversité guide l'entreprise vers des pratiques écologiques.");
        $Bob->setPictureFileName("bob.jpeg");
        $manager->persist($Bob);

        $Tom = new User();
        $hash = $this->encoder->hashPassword($Tom, 'password');

        $Tom->setFirstname("Tom");
        $Tom->setLastname($faker->lastName);
        $Tom->setEmail("tom@canopee.com");
        $Tom->setTel($faker->phoneNumber);
        $Tom->setPassword($hash);
        $Tom->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        $Tom->setTitle("TOM - Directeur Créatif");
        $Tom->setDescription("Tom, co-fondateur, possède un solide background en paysagisme. Créatif et visionnaire, il transforme les espaces verts en œuvres d'art vivantes.");
        $Tom->setPictureFileName("tom.jpeg");
        $manager->persist($Tom);

        // Setup clients
        for ($c = 0; $c < 3; $c++) {
            $client = new Client();
            $client->setActive(TRUE);
            $type = [
                'particulier',
                'professionnel',
                'collectivité'
            ];
            $client->setType($type[$c]);
            switch ($type[$c]) {
                case 'particulier':
                    $client->setDescription("Le client type de Canopées est un <span class='text-custom-green fw-bold'>particulier</span> passionné par la nature et soucieux de l'esthétique et de la santé de son espace extérieur.<br /> Souvent propriétaire d'une maison avec jardin, ce client valorise un espace vert bien entretenu qui non seulement embellit sa propriété mais crée aussi un havre de paix pour sa famille et lui.<br /> Il est conscient de l'importance de l'environnement et cherche des solutions écologiques pour l'entretien de son jardin.");
                    break;
                case 'professionnel':
                    $client->setDescription("Les clients <span class='text-custom-red fw-bold'>professionnels</span> de Canopées, soucieux de leur image, investissent dans des espaces verts pour renforcer leur prestige. Ils exigent des solutions durables qui allient esthétique et écologie. <br /> Ces responsables recherchent des services sur mesure, prioritaires pour l'accueil et le bien-être de leur clientèle. <br /> Ils valorisent l'écoresponsabilité, choisissant Canopées pour son engagement en faveur de la valorisation des déchets verts et de la préservation environnementale.");
                    break;
                case 'collectivité':
                    $client->setDescription("Les <span class='text-custom-violet fw-bold'>collectivités territoriales</span> partenaires de Canopées visent à embellir les espaces publics, améliorant ainsi la qualité de vie des citoyens. Elles privilégient des projets verts durables. <br /> Ces administrations s'engagent dans des initiatives écologiques, cherchant à réduire l'empreinte environnementale à travers des pratiques de gestion durable des espaces verts.<br /> Elles valorisent la collaboration avec Canopées pour son expertise et son engagement envers des solutions respectueuses de l'environnement.");
                    break;
            };

            $manager->persist($client);
        }

        // Setup contacts
        for ($co = 0; $co < 10; $co++) {
            $contact = new Contact();
            $contact->setFirstname($faker->firstName);
            $contact->setLastname($faker->lastName);
            $contact->setEmail($faker->email);
            $contact->setTel($faker->phoneNumber);
            $contact->setMessage("Bonjour, je suis intéressé par vos services. Pouvez-vous me contacter pour plus d'informations ?");
            $manager->persist($contact);
        }

        // Setup prestations + Prices + images
        for ($p = 0; $p < 5; $p++) {
            $prestation = new Prestation();
            $Price = new Prices();
            $prestations = [
                'Conception/Realisation',
                'Entretien',
                'Taille',
                'Élagage/Abattage',
                'Valorisation'
            ];
            $prestation->setTitle($prestations[$p]);
            $manager->persist($prestation);

            // Setup Prices
            $Price->setPrestation($prestation);
            // Generate minPrice
            $minPrice = $faker->randomFloat(2, 10, 100);
            // Generate a temporary meanPrice greater than minPrice
            $tempMeanPrice = $faker->randomFloat(2, $minPrice, 100);
            // Ensure meanPrice is strictly between minPrice and maxPrice by adjusting the range for maxPrice generation
            $maxPrice = $faker->randomFloat(2, $tempMeanPrice + 0.01, 100 + 0.01); // Adding a small value to ensure it's greater
            // Adjust meanPrice to be strictly between minPrice and maxPrice
            $meanPrice = ($minPrice + $maxPrice) / 2;
            // Set the prices
            $Price->setMinPrice($minPrice);
            $Price->setMeanPrice($meanPrice);
            $Price->setMaxPrice($maxPrice);
            $manager->persist($Price);

            // Setup Images
            // $image = new Image();
            // $i = $p + 1;
            // $image->setSrc('presta' . $i . '.jpg');
            // $image->setalt("Prestation : " . $prestations[$p]);
            // $image->setTitle("Image prestation " . $i);
            // $image->setPrestation($prestation);
            // $image->setActive(TRUE);
            // $manager->persist($image);
        }
        // Setup Texts
        $page = [
            'Accueil',
            'Qui-sommes-nous',
            'Prestations',
            'Tarifs',
            'Contact'
        ];

        for ($i = 0; $i < count($page); $i++) {
            $text = new Text();
            switch ($page[$i]) {
                case "Accueil":
                    $text->setText("Bienvenue sur le site de Canopées, votre partenaire privilégié pour la conception, la réalisation, et l'entretien d'espaces verts. Fondée en 2020 par Bob et Tom, deux passionnés de la nature, notre société s'engage à offrir des services de qualité pour embellir vos extérieurs, que vous soyez particuliers, professionnels ou collectivités territoriales. Chez Canopées, nous croyons fermement que chaque espace vert a le potentiel de devenir un petit coin de paradis. Nos services sont conçus pour transformer cette vision en réalité.<br /> Notre engagement envers l'environnement se reflète également dans notre charte graphique, inspirée de la valorisation des déchets verts. Nous pratiquons le compostage des déchets issus de nos activités, réduisant ainsi l'impact environnemental et enrichissant la terre que nous chérissons tant.<br /> Explorez notre site pour découvrir davantage sur nos services et comment nous pouvons vous aider à réaliser le jardin de vos rêves. Chez Canopées, nous sommes dédiés à la beauté de vos espaces extérieurs et à la préservation de notre planète. Contactez-nous dès aujourd'hui pour faire le premier pas vers la création ou l'entretien de votre espace vert idéal.");
                    break;
                case "Qui-sommes-nous":
                    $text->setText("Bienvenue sur le site de Canopées, votre partenaire privilégié pour la conception, la réalisation, et l'entretien d'espaces verts. Fondée en 2020 par Bob et Tom, deux passionnés de la nature, notre société s'engage à offrir des services de qualité pour embellir vos extérieurs, que vous soyez particuliers, professionnels ou collectivités territoriales. Chez Canopées, nous croyons fermement que chaque espace vert a le potentiel de devenir un petit coin de paradis. Nos services sont conçus pour transformer cette vision en réalité.<br /> Notre engagement envers l'environnement se reflète également dans notre charte graphique, inspirée de la valorisation des déchets verts. Nous pratiquons le compostage des déchets issus de nos activités, réduisant ainsi l'impact environnemental et enrichissant la terre que nous chérissons tant.<br /> Explorez notre site pour découvrir davantage sur nos services et comment nous pouvons vous aider à réaliser le jardin de vos rêves. Chez Canopées, nous sommes dédiés à la beauté de vos espaces extérieurs et à la préservation de notre planète. Contactez-nous dès aujourd'hui pour faire le premier pas vers la création ou l'entretien de votre espace vert idéal.");
                    break;
                case "Prestations":
                    $text->setText("");
                    break;
                case "Tarifs":
                    $text->setText("");
                    break;
                case "Contact":
                    $text->setText("
                    * Champs obligatoires
                    ** Les données personnelles communiquées sont nécessaires aux fins de vous contacter. Elles sont destinées à Acrocimes élagage et ses sous-traitants. Vous disposez de droits d’accès, de rectification, d’effacement, de portabilité, de limitation, d’opposition, de retrait de votre consentement à tout moment et du droit d’introduire une réclamation auprès d’une autorité de contrôle, ainsi que d’organiser le sort de vos données post-mortem. Vous pouvez exercer ces droits par voie postale à l'adresse 24 Rue Anatole France, 66670 Bages, France, ou par courrier électronique à l'adresse contact@acrocimes-elagage.fr. Un justificatif d'identité pourra vous être demandé. Nous conservons vos données pendant la période de prise de contact puis pendant la durée de prescription légale aux fins probatoires et de gestion des contentieux.");
                    break;
                default:
                    $text->setText("Page inconnue");
                    break;
            }
            $text->setPage($page[$i]);
            $manager->persist($text);
        }

        // Setup réalisations

        $realisation1 = new Realisation();
        $realisation1->setTitle("JARDIN À MURETS ET PAREMENT EN PIERRE ÉTAGÉS");
        $realisation1->setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis");
        $realisation1->setActive(TRUE);
        $realisation1->setImageFileName('rea1.jpg');
        $manager->persist($realisation1);
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

        // Setup Images for Carousel
        for ($i = 0; $i < 4; $i++) {
            $imageCarousel = new ImageForCarousel();
            $imageCarousel->setSrc('carousel' . $i+1 . '.jpg');
            $imageCarousel->setalt("Carousel : " . $i+1);
            $imageCarousel->setActive(TRUE);
            $manager->persist($imageCarousel);
        }


        $manager->flush();
    }
}
