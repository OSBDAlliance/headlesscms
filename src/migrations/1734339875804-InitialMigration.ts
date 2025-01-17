import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1734339875804 implements MigrationInterface {
    name = 'InitialMigration1734339875804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`content_types\` (\`contentTypeId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`schema\` json NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_7635b59b8e89fdf4314d1436ea\` (\`name\`), PRIMARY KEY (\`contentTypeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_metadata\` (\`metadataId\` int NOT NULL AUTO_INCREMENT, \`contentId\` int NOT NULL, \`metaKey\` varchar(100) NOT NULL, \`metaValue\` text NULL, PRIMARY KEY (\`metadataId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_versions\` (\`versionId\` int NOT NULL AUTO_INCREMENT, \`contentId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`body\` text NULL, \`version\` int NOT NULL, \`createdById\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`changeComment\` varchar(500) NULL, PRIMARY KEY (\`versionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_categories\` (\`categoryId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`slug\` varchar(100) NOT NULL, \`parentCategoryId\` int NULL, \`description\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_3ccfa5937c762b2c4fdc60ee09\` (\`slug\`), PRIMARY KEY (\`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_category_mapping\` (\`contentId\` int NOT NULL, \`categoryId\` int NOT NULL, PRIMARY KEY (\`contentId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content\` (\`contentId\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`body\` text NULL, \`contentTypeId\` int NOT NULL, \`status\` varchar(50) NOT NULL DEFAULT 'draft', \`createdById\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedById\` int NULL, \`modifiedDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`publishedDate\` datetime NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_dfe3ab560d448427f463febbe7\` (\`slug\`), PRIMARY KEY (\`contentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_api_logs\` (\`logId\` int NOT NULL AUTO_INCREMENT, \`operation\` varchar(50) NOT NULL, \`contentId\` int NULL, \`userId\` int NOT NULL, \`requestData\` text NULL, \`responseData\` text NULL, \`statusCode\` int NULL, \`errorMessage\` text NULL, \`ipAddress\` varchar(50) NULL, \`userAgent\` varchar(255) NULL, \`requestDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`executionTime\` int NULL, PRIMARY KEY (\`logId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`content_metadata\` ADD CONSTRAINT \`FK_7720808381ee5c13b7bfc79ffcf\` FOREIGN KEY (\`contentId\`) REFERENCES \`content\`(\`contentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_versions\` ADD CONSTRAINT \`FK_5ae2351d1653cc9e0daf0ca84ee\` FOREIGN KEY (\`contentId\`) REFERENCES \`content\`(\`contentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_categories\` ADD CONSTRAINT \`FK_19a3633a865b62eac1ae9e3e4e8\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`content_categories\`(\`categoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_category_mapping\` ADD CONSTRAINT \`FK_69a002314c8e79a89126d3a0e1c\` FOREIGN KEY (\`contentId\`) REFERENCES \`content\`(\`contentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_category_mapping\` ADD CONSTRAINT \`FK_fdbb268100622b58c8ede472bd2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`content_categories\`(\`categoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content\` ADD CONSTRAINT \`FK_fc5d23b531c9501ddcdd0ab45f5\` FOREIGN KEY (\`contentTypeId\`) REFERENCES \`content_types\`(\`contentTypeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_api_logs\` ADD CONSTRAINT \`FK_3a1feae7a218b9aa872359cc897\` FOREIGN KEY (\`contentId\`) REFERENCES \`content\`(\`contentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content_api_logs\` DROP FOREIGN KEY \`FK_3a1feae7a218b9aa872359cc897\``);
        await queryRunner.query(`ALTER TABLE \`content\` DROP FOREIGN KEY \`FK_fc5d23b531c9501ddcdd0ab45f5\``);
        await queryRunner.query(`ALTER TABLE \`content_category_mapping\` DROP FOREIGN KEY \`FK_fdbb268100622b58c8ede472bd2\``);
        await queryRunner.query(`ALTER TABLE \`content_category_mapping\` DROP FOREIGN KEY \`FK_69a002314c8e79a89126d3a0e1c\``);
        await queryRunner.query(`ALTER TABLE \`content_categories\` DROP FOREIGN KEY \`FK_19a3633a865b62eac1ae9e3e4e8\``);
        await queryRunner.query(`ALTER TABLE \`content_versions\` DROP FOREIGN KEY \`FK_5ae2351d1653cc9e0daf0ca84ee\``);
        await queryRunner.query(`ALTER TABLE \`content_metadata\` DROP FOREIGN KEY \`FK_7720808381ee5c13b7bfc79ffcf\``);
        await queryRunner.query(`DROP TABLE \`content_api_logs\``);
        await queryRunner.query(`DROP INDEX \`IDX_dfe3ab560d448427f463febbe7\` ON \`content\``);
        await queryRunner.query(`DROP TABLE \`content\``);
        await queryRunner.query(`DROP TABLE \`content_category_mapping\``);
        await queryRunner.query(`DROP INDEX \`IDX_3ccfa5937c762b2c4fdc60ee09\` ON \`content_categories\``);
        await queryRunner.query(`DROP TABLE \`content_categories\``);
        await queryRunner.query(`DROP TABLE \`content_versions\``);
        await queryRunner.query(`DROP TABLE \`content_metadata\``);
        await queryRunner.query(`DROP INDEX \`IDX_7635b59b8e89fdf4314d1436ea\` ON \`content_types\``);
        await queryRunner.query(`DROP TABLE \`content_types\``);
    }

}
