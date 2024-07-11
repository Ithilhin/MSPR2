<?php

namespace App\Entity;

use App\Repository\ContactRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ContactRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['contacts_read']],
    denormalizationContext: ['groups' => ['contacts_write']],
)]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['contacts_write'])]
    #[Assert\NotBlank(message: 'Veuillez saisir un nom')]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['contacts_write'])]
    #[Assert\NotBlank(message: 'Veuillez saisir un prénom')]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['contacts_write'])]
    #[Assert\NotBlank(message: 'Veuillez saisir un email')]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(['contacts_write'])]
    #[Assert\NotBlank(message: 'Veuillez saisir un numéro de téléphone')]
    private ?string $tel = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['contacts_write'])]
    #[Assert\NotBlank(message: 'Veuillez saisir un message')]
    private ?string $message = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): static
    {
        $this->tel = $tel;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }
}
