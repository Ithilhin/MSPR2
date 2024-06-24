<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['image_read']],
)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $src = null;

    #[ORM\Column(length: 255)]
    #[Groups(['image_read'])]
    private ?string $alt = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column]
    #[Groups(['image_read'])]
    private ?bool $carouselImage = null;

    #[ORM\OneToOne(mappedBy: 'image', cascade: ['persist', 'remove'])]
    private ?Realisation $realisation = null;

    

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[Groups(['image_read'])]
    private ?Prestation $prestation = null;

    #[ORM\Column(length: 255)]
    #[Groups(['image_read'])]
    private ?string $title = null;

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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function isCarouselImage(): ?bool
    {
        return $this->carouselImage;
    }

    public function setCarouselImage(bool $carouselImage): static
    {
        $this->carouselImage = $carouselImage;

        return $this;
    }

    public function getRealisation(): ?Realisation
    {
        return $this->realisation;
    }

    public function setRealisation(Realisation $realisation): static
    {
        // set the owning side of the relation if necessary
        if ($realisation->getImage() !== $this) {
            $realisation->setImage($this);
        }

        $this->realisation = $realisation;

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
}
