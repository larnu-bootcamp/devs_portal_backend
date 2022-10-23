import 'reflect-metadata';
import { DataSource, } from 'typeorm';
import { config } from 'dotenv';


config();

/**
 * 
 * @description before connecting the database validate that
 * devs_portal db already exits if not: npm run db:create
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
});

export const connectDb = async () => {
  try {
    const { options } = await AppDataSource.initialize();
    console.log(`[DB ⚡] ${options.database} running.`,);
  } catch (error) {
    console.log(error);
  }
};
