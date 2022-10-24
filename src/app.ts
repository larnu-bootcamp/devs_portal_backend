import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { defaultErrorHandler } from './middlewares/defaultErrorHandler';
import { developersRouter } from './developer/router';


export const app = express();

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

app.use('/api/v1/developers', developersRouter);

// 3. defaultErrorHandler middleware
app.use('/api/v1/', defaultErrorHandler);
