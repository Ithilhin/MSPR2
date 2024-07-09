<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ImageForCarouselRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ImageForCarouselRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['image_for_carousel_read']],
    denormalizationContext: ['groups' => ['image_for_carousel_write']],
)]
class ImageForCarousel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["image_for_carousel_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $src = null;

    #[ORM\Column]
    #[Groups(["image_for_carousel_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?bool $active = null;

    #[Groups(["image_for_carousel_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $alt = null;

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

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

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
}
