import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTranslations1614027252559 implements MigrationInterface {
    public name = "UserTranslations1614027252559";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL DEFAULT 'new', "phraseId" uuid, "userId" uuid, CONSTRAINT "PK_35f97f7c0e4322a7a16ed598f5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35f97f7c0e4322a7a16ed598f5" ON "user_translations" ("id") `);
        await queryRunner.query(`ALTER TABLE "user_translations" ADD CONSTRAINT "FK_88e019e8e05e1915cdcc3b54786" FOREIGN KEY ("phraseId") REFERENCES "phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_translations" ADD CONSTRAINT "FK_fb7e059f3e6836cc4026017df90" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_translations" DROP CONSTRAINT "FK_fb7e059f3e6836cc4026017df90"`);
        await queryRunner.query(`ALTER TABLE "user_translations" DROP CONSTRAINT "FK_88e019e8e05e1915cdcc3b54786"`);
        await queryRunner.query(`DROP INDEX "IDX_35f97f7c0e4322a7a16ed598f5"`);
        await queryRunner.query(`DROP TABLE "user_translations"`);
    }

}
