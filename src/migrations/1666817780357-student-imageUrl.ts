import { MigrationInterface, QueryRunner } from 'typeorm';


export class studentImageUrl1666817780357 implements MigrationInterface {
  name = 'studentImageUrl1666817780357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "student" ADD "image_url" character varying NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "student" DROP COLUMN "image_url"');
  }
}
