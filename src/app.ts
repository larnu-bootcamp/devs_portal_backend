import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectStorageEmulator } from 'firebase/storage';
import { fbStorage } from './services/firebase/firebase.config';
import { defaultErrorHandler } from './middlewares/defaultErrorHandler';
import { developersRouter } from './developer/router';


export const app = express();

// 1. middlewares
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
  connectStorageEmulator(fbStorage, 'localhost', 9199);
}
app.use(express.json());
app.use(cors());

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
