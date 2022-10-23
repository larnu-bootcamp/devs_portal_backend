import { MigrationInterface, QueryRunner } from 'typeorm';


export class tables1666471139730 implements MigrationInterface {
  name = 'tables1666471139730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "recruiter" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "company" character varying NOT NULL, CONSTRAINT "UQ_ec6610f232573009dfecae5bdf3" UNIQUE ("email"), CONSTRAINT "PK_e10c71ef86a9be2a6aead8eadfa" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "email" character varying NOT NULL, "active" boolean NOT NULL, "skills" character varying array NOT NULL DEFAULT \'{}\', "profession" character varying NOT NULL, "description" text NOT NULL, "github" character varying NOT NULL, "linkedin" character varying NOT NULL, "portfolio" character varying NOT NULL, CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL, "rol" character varying NOT NULL, CONSTRAINT "UQ_0d41e4ba286d04881756d625ebd" UNIQUE ("email"), CONSTRAINT "PK_7b1706f6f2f543c10c3f2e79754" PRIMARY KEY ("id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "student"');
    await queryRunner.query('DROP TABLE "recruiter"');
  }
}
