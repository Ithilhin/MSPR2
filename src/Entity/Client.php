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
    normalizationContext: ['groups' => ['clients_read']], // Specify the group for read operations to control the serialization context.
    denormalizationContext: ['groups' => ['clients_write']], // Specify the group for write operations to control the deserialization context.
)]
class Client
{
    #[ORM\Id]
    #[ORM\GeneratedValue] // Automatically generate the ID value.
    #[ORM\Column] // Define the column in the database.
    private ?int $id = null; // Nullable integer for the client's ID, initialized as null.

    #[ORM\Column(length: 255)] // Define the column with a specific length.
    #[Groups(["clients_read"])] // Include this property in the 'clients_read' group for API responses.
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')] // Ensure the field is not blank with a validation message.
    private ?string $type = null; // Nullable string for the client's type, initialized as null.

    #[ORM\Column(type: Types::TEXT)] // Define the column with a TEXT type for longer content.
    #[Groups(["clients_read"])] // Include this property in the 'clients_read' group for API responses.
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')] // Ensure the field is not blank with a validation message.
    private ?string $description = null; // Nullable string for the client's description, initialized as null.

    #[ORM\Column] // Define the column in the database.
    #[Groups(["clients_read"])] // Include this property in the 'clients_read' group for API responses.
    private ?bool $active = null; // Nullable boolean for the client's active status, initialized as null.


    // Getter for the client's ID.
    public function getId(): ?int
    {
        return $this->id;
    }

    // Getter for the client's type.
    public function getType(): ?string
    {
        return $this->type;
    }

    // Setter for the client's type. Returns the instance for method chaining.
    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    // Getter for the client's description.
    public function getDescription(): ?string
    {
        return $this->description;
    }

    // Setter for the client's description. Returns the instance for method chaining.
    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    // Getter for the client's active status.
    public function isActive(): ?bool
    {
        return $this->active;
    }

    // Setter for the client's active status. Returns the instance for method chaining.
    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }
}
