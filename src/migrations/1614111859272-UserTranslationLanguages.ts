import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTranslationLanguages1614111859272 implements MigrationInterface {
    public name = "UserTranslationLanguages1614111859272";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_translation_languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "languageId" uuid, "userTranslationId" uuid, CONSTRAINT "PK_2edbdfe50987b487b90ffe90389" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2edbdfe50987b487b90ffe9038" ON "user_translation_languages" ("id") `);
        await queryRunner.query(`ALTER TABLE "user_translation_languages" ADD CONSTRAINT "FK_9d96b67c4322e657c94ae8d5eba" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_translation_languages" ADD CONSTRAINT "FK_f14298c383e45c25c2fe7eae451" FOREIGN KEY ("userTranslationId") REFERENCES "user_translations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_translation_languages" DROP CONSTRAINT "FK_f14298c383e45c25c2fe7eae451"`);
        await queryRunner.query(`ALTER TABLE "user_translation_languages" DROP CONSTRAINT "FK_9d96b67c4322e657c94ae8d5eba"`);
        await queryRunner.query(`DROP INDEX "IDX_2edbdfe50987b487b90ffe9038"`);
        await queryRunner.query(`DROP TABLE "user_translation_languages"`);
    }

}
