<?php

namespace App\Entity;

use App\Repository\PricesRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PricesRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['prices_read']],
)]
class Prices
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['prices_read'])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?float $minPrice = null;

    #[ORM\Column]
    #[Groups(['prices_read'])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?float $meanPrice = null;

    #[ORM\Column]
    #[Groups(['prices_read'])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?float $maxPrice = null;

    #[ORM\OneToOne(inversedBy: 'prices', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['prices_read'])]
    private ?Prestation $prestation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMinPrice(): ?float
    {
        return $this->minPrice;
    }

    public function setMinPrice(float $minPrice): static
    {
        $this->minPrice = $minPrice;

        return $this;
    }

    public function getMeanPrice(): ?float
    {
        return $this->meanPrice;
    }

    public function setMeanPrice(float $meanPrice): static
    {
        $this->meanPrice = $meanPrice;

        return $this;
    }

    public function getMaxPrice(): ?float
    {
        return $this->maxPrice;
    }

    public function setMaxPrice(float $maxPrice): static
    {
        $this->maxPrice = $maxPrice;

        return $this;
    }

    public function getPrestation(): ?Prestation
    {
        return $this->prestation;
    }

    public function setPrestation(Prestation $prestation): static
    {
        $this->prestation = $prestation;

        return $this;
    }
}
