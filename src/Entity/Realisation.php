<?php

namespace App\Entity;

use App\Repository\RealisationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RealisationRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['realisations_read']],
    denormalizationContext: ['groups' => ['realisations_write']],
)]
class Realisation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["realisations_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["realisations_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $text = null;

    #[ORM\Column]
    #[Groups(["realisations_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?bool $active = null;

    #[ORM\Column(length: 255)]
    #[Groups(["realisations_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $imageFileName = null;

    

    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): static
    {
        $this->text = $text;

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

    public function getImageFileName(): ?string
    {
        return $this->imageFileName;
    }

    public function setImageFileName(string $imageFileName): static
    {
        $this->imageFileName = $imageFileName;

        return $this;
    }

    
}
