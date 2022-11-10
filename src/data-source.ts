import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotEnv from 'dotenv';
import { Student } from './developer/entity';
import { Recruiter } from './recruiter/entity';
import { User } from './user/entity';


dotEnv.config();
const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  ssl: process.env.NODE_ENV === 'production' ? true : false,
  entities: [Student, Recruiter, User],
  migrations: process.env.NODE_ENV !== 'production' ? ['src/migrations/*.ts'] : ['dist/src/migrations/*.js'],
  seeds: process.env.NODE_ENV !== 'production' ? ['src/seeds/*.seed.ts'] : ['dist/src/seeds/*.seed.js'],
  factories: process.env.NODE_ENV !== 'production' ? ['src/seeds/*.factory.ts'] : ['dist/src/seeds/*.factory.js'],
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
