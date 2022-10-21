import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';


config();
export const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
