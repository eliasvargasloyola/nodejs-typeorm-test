import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUrlPhotoMetadata1632753732604 implements MigrationInterface {
    name = 'AddUrlPhotoMetadata1632753732604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo_metadata" ("id" SERIAL NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "orientation" character varying NOT NULL, "compressed" boolean NOT NULL DEFAULT false, "comment" character varying, "url" character varying(255) NOT NULL, "photoId" integer, CONSTRAINT "REL_99f01ed52303cc16139d69f746" UNIQUE ("photoId"), CONSTRAINT "PK_da29f04585dc190eb00e4d73420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photo_metadata" ADD CONSTRAINT "FK_99f01ed52303cc16139d69f7464" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo_metadata" DROP CONSTRAINT "FK_99f01ed52303cc16139d69f7464"`);
        await queryRunner.query(`DROP TABLE "photo_metadata"`);
    }

}
