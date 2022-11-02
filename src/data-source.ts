import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { config } from 'dotenv';
import { Student } from './developer/entity';
import { Recruiter } from './recruiter/entity';
import { User } from './user/entity';


config();
const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [Student, Recruiter, User],
  migrations: ['src/migrations/*.ts'],
  seeds: ['src/seeds/*.seed.ts'],
  factories: ['src/seeds/*.factory.ts'],
};

/**
 * 
 * @description before connecting the database validate that
 * devs_portal database already exits.
 *
 * if not:
 * npm run db:up or npm run db:create
 */
export const AppDataSource = new DataSource(options);

export const connectDb = async () => {
  try {
    const { options } = await AppDataSource.initialize();
    console.log(`[DataBase ⚡] ${options.database} running.`,);
  } catch (error) {
    console.log(error);
  }
};
