<?php

namespace App\Entity;

use App\Repository\PricesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PricesRepository::class)]
class Prices
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $minPrice = null;

    #[ORM\Column]
    private ?float $meanPrice = null;

    #[ORM\Column]
    private ?float $maxPrice = null;

    #[ORM\OneToOne(inversedBy: 'prices', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?prestation $prestation = null;

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

    public function getPrestation(): ?prestation
    {
        return $this->prestation;
    }

    public function setPrestation(prestation $prestation): static
    {
        $this->prestation = $prestation;

        return $this;
    }
}
