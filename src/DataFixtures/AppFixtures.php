<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\Contact;
use App\Entity\Prestation;
use App\Entity\Prices;
use App\Entity\User;
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

        for ($u = 0; $u < 100; $u++) {
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

        for ($c = 0; $c < 10; $c++) {
            $client = new Client();
            $client->setActive(true);
            $client->setType($faker->randomElement(['particulier', 'professionnel', 'collectivité']));
            $client->setDescription($faker->realText(
                $maxNbChars = 50,
                $indexSize = 2
            ));
            $manager->persist($client);
        }

        for ($co =0; $co < 10; $co++) {
            $contact = new Contact();
            $contact->setFirstname($faker->firstName);
            $contact->setLastname($faker->lastName);
            $contact->setEmail($faker->email);
            $contact->setTel($faker->phoneNumber);
            $manager->persist($contact);
        }

        // Setup prestations + Prices
        for ($p = 0; $p < 5; $p++) {
            $prestation = new Prestation();
            $Price= new Prices();
            $prestations=[
                'Conception/Realisation',
                'Entretien',
                'Taille',
                'Élagage/Abattage',
                'Valorisation'];
            $prestation->setTitle($prestations[$p]);
            $manager->persist($prestation);

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
            
        }
        $manager->flush();
    }
}
