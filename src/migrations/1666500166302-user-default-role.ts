import { MigrationInterface, QueryRunner } from 'typeorm';

export class userDefaultRole1666500166302 implements MigrationInterface {
  name = 'userDefaultRole1666500166302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT \'admin\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT');
  }

}
