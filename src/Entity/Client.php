<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['clients_read']],
    denormalizationContext: ['groups' => ['clients_write']],
)]
class Client
{




    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["clients_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $type = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["clients_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(["clients_read"])]
    private ?bool $active = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }
}
