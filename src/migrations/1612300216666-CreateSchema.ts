import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSchema1612300216666 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying(64) NOT NULL, "lastname" character varying(64) NOT NULL, "email" character varying(64) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3ffb1c0c8416b9fc6f907b743" ON "users" ("id") `);
        await queryRunner.query(`CREATE TABLE "languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(64) NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b517f827ca496b29f4d549c631" ON "languages" ("id") `);
        await queryRunner.query(`CREATE TABLE "phrases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_f7ffbe7963e64d31d215f4126e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f7ffbe7963e64d31d215f4126e" ON "phrases" ("id") `);
        await queryRunner.query(`CREATE TABLE "phrase_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "translation" character varying(64) NOT NULL, "phraseId" uuid, "languageId" uuid, CONSTRAINT "PK_aa74308e4628fb198f1b6216fd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aa74308e4628fb198f1b6216fd" ON "phrase_translations" ("id") `);
        await queryRunner.query(`ALTER TABLE "phrase_translations" ADD CONSTRAINT "FK_5d87fd887d7217eeb9afbf37156" FOREIGN KEY ("phraseId") REFERENCES "phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phrase_translations" ADD CONSTRAINT "FK_ac91b2e8e48baa1bd4d54173964" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phrase_translations" DROP CONSTRAINT "FK_ac91b2e8e48baa1bd4d54173964"`);
        await queryRunner.query(`ALTER TABLE "phrase_translations" DROP CONSTRAINT "FK_5d87fd887d7217eeb9afbf37156"`);
        await queryRunner.query(`DROP INDEX "IDX_aa74308e4628fb198f1b6216fd"`);
        await queryRunner.query(`DROP TABLE "phrase_translations"`);
        await queryRunner.query(`DROP INDEX "IDX_f7ffbe7963e64d31d215f4126e"`);
        await queryRunner.query(`DROP TABLE "phrases"`);
        await queryRunner.query(`DROP INDEX "IDX_b517f827ca496b29f4d549c631"`);
        await queryRunner.query(`DROP TABLE "languages"`);
        await queryRunner.query(`DROP INDEX "IDX_a3ffb1c0c8416b9fc6f907b743"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
