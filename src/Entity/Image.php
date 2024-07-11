<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['image_read']],
    denormalizationContext: ['groups' => ['image_write']],
)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['image_read'])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $src = null;

    #[ORM\Column(length: 255)]
    #[Groups(['image_read'])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $alt = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[Groups(['image_read'])]
    private ?Prestation $prestation = null;

    #[ORM\Column(length: 255)]
    #[Groups(['image_read'])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $title = null;

    #[ORM\Column]
    #[Groups(['image_read'])]
    private ?bool $active = null;

    public function __toString() {
        // Return the filename or any other string that represents this object
        return $this->src;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSrc(): ?string
    {
        return $this->src;
    }

    public function setSrc(string $src): static
    {
        $this->src = $src;

        return $this;
    }

    public function getAlt(): ?string
    {
        return $this->alt;
    }

    public function setAlt(string $alt): static
    {
        $this->alt = $alt;

        return $this;
    }

    public function getPrestation(): ?Prestation
    {
        return $this->prestation;
    }

    public function setPrestation(?Prestation $prestation): static
    {
        $this->prestation = $prestation;

        return $this;
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
