import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import { defaultErrorHandler } from './middlewares/defaultErrorHandler';


config();
export const app = express();

// 1. middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2. mounting routers
app.use('/api/v1/ping', async (req, res, next) => {
  try {
    res.status(200).json({
      message: 'pong'
    });
  } catch (error) {
    next(error);
  }
});

// 3. defaultErrorHandler middleware
app.use('/api/v1/', defaultErrorHandler);
