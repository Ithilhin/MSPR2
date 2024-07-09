<?php

namespace App\Entity;

use App\Repository\TextRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: TextRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['texts_read']],
    denormalizationContext: ['groups' => ['texts_write']],
)]
class Text
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["texts_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $Page = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["texts_read"])]
    #[Assert\NotBlank(message: 'Ce champs ne peux pas etre vide')]
    private ?string $text = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPage(): ?string
    {
        return $this->Page;
    }

    public function setPage(string $Page): static
    {
        $this->Page = $Page;

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
}
