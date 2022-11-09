import { MigrationInterface, QueryRunner } from 'typeorm';

export class imageToJson1667230769592 implements MigrationInterface {
  name = 'imageToJson1667230769592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "student" RENAME COLUMN "image_url" TO "image"');
    await queryRunner.query('ALTER TABLE "student" DROP COLUMN "image"');
    await queryRunner.query('ALTER TABLE "student" ADD "image" text');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "student" DROP COLUMN "image"');
    await queryRunner.query('ALTER TABLE "student" ADD "image" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "student" RENAME COLUMN "image" TO "image_url"');
  }
}
