<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240624204933 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE realisation DROP FOREIGN KEY FK_EAA5610E3DA5256D');
        $this->addSql('DROP INDEX UNIQ_EAA5610E3DA5256D ON realisation');
        $this->addSql('ALTER TABLE realisation DROP image_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE realisation ADD image_id INT NOT NULL');
        $this->addSql('ALTER TABLE realisation ADD CONSTRAINT FK_EAA5610E3DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_EAA5610E3DA5256D ON realisation (image_id)');
    }
}
