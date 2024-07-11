<?php

namespace App\Entity;

use App\Repository\PrestationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

// Define the Prestation entity with API resource annotations for serialization groups.
#[ORM\Entity(repositoryClass: PrestationRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['prestations_read']], // Specify groups for data normalization (output).
    denormalizationContext: ['groups' => ['prestations_write']], // Specify groups for data denormalization (input).
)]
class Prestation
{
    // Define properties with ORM annotations for database mapping and validation constraints.

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null; // Unique identifier for each Prestation entity, auto-generated.

    #[ORM\Column(length: 255)]
    #[Groups(['prestations_read', 'prices_read', 'image_read'])] // Include in these serialization groups.
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')] // Validation to ensure the title is not blank.
    private ?string $title = null; // Title of the prestation.

    // Define a one-to-one relationship with Prices entity, with cascade operations.
    #[ORM\OneToOne(mappedBy: 'prestation', cascade: ['persist', 'remove'])]
    private ?Prices $prices = null; // Prices associated with this prestation.

    /**
     * @var Collection<int, Image> // Define a collection of Image entities related to this prestation.
     */
    #[ORM\OneToMany(targetEntity: Image::class, mappedBy: 'prestation')]
    private Collection $images; // Images associated with this prestation.

    public function __construct()
    {
        $this->images = new ArrayCollection(); // Initialize the images collection.
    }

    public function __toString(): string
    {
        return $this->title; // When the object is treated as a string, return its title.
    }

    // Standard getter and setter methods below.

    public function getId(): ?int
    {
        return $this->id; // Return the prestation's ID.
    }

    public function getTitle(): ?string
    {
        return $this->title; // Return the prestation's title.
    }

    public function setTitle(string $title): static
    {
        $this->title = $title; // Set the prestation's title and return the instance for chaining.

        return $this;
    }

    public function getPrices(): ?Prices
    {
        return $this->prices; // Return the associated Prices entity.
    }

    public function setPrices(Prices $prices): static
    {
        // Ensures the Prices entity is correctly associated with this Prestation.
        // This checks if the current Prestation is not already set in the Prices entity to avoid infinite recursion.
        if ($prices->getPrestation() !== $this) {
            $prices->setPrestation($this);
        }

        // Assigns the Prices entity to this Prestation.
        $this->prices = $prices;

        // Allows for method chaining.
        return $this;
    }

    /**
     * Returns a collection of Image entities associated with this Prestation.
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        // Accessor method for the images collection.
        return $this->images;
    }

    public function addImage(Image $image): static
    {
        // Adds an Image entity to the Prestation's collection of images if it's not already included.
        if (!$this->images->contains($image)) {
            $this->images->add($image);
            // Ensures the relationship is bidirectional by setting this Prestation in the Image entity.
            $image->setPrestation($this);
        }

        // Allows for method chaining.
        return $this;
    }

    public function removeImage(Image $image): static
    {
        // Removes an Image entity from the Prestation's collection of images.
        if ($this->images->removeElement($image)) {
            // If the Image was successfully removed, ensure the relationship is correctly unset.
            // This checks if the Image entity is still associated with this Prestation and sets its Prestation to null if so.
            if ($image->getPrestation() === $this) {
                $image->setPrestation(null);
            }
        }

        // Allows for method chaining.
        return $this;
    }
}
