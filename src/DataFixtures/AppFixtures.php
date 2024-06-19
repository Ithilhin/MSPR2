<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\Contact;
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

        $manager->flush();
    }
}
