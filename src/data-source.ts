import 'reflect-metadata';
import { DataSource, } from 'typeorm';
import { config } from 'dotenv';


config();
/**
 * 
 * @description before connecting the database validate that
 * devs_portal db already exits if not run: npm run db:create
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: true,
  logging: true,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
});

export const connectDb = async () => {
  AppDataSource.initialize()
    .then(res => {
      console.log(`[DB ⚡] ${res.options.database} running.`,);
    })
    .catch(err => {
      console.log(err);
    });
};