import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeAttributes1632750330332 implements MigrationInterface {
    name = 'ChangeAttributes1632750330332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" RENAME COLUMN "name" TO "title"`);
        await queryRunner.query(`ALTER TABLE "public"."author" ADD "link" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."author" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "public"."photo" RENAME COLUMN "title" TO "name"`);
    }

}
