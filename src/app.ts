import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDb } from './data-source';
import { defaultErrorHandler } from './middlewares/defaultErrorHandler';


export const app = express();
connectDb();

// 1. middlewares
app.use(express.json());
app.use(cors());

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
