import { MigrationInterface, QueryRunner } from 'typeorm';


export class timestamps1666484123932 implements MigrationInterface {
  name = 'timestamps1666484123932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "recruiter" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "recruiter" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "user" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "user" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "student" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "student" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "student" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "student" DROP COLUMN "created_at"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "created_at"');
    await queryRunner.query('ALTER TABLE "recruiter" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "recruiter" DROP COLUMN "created_at"');
  }

}
