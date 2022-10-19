import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';


config();
export const app = express();
app.use(express.json());
app.use('/api/v1/ping', async (req, res, next) => {
  try {
    res.status(200).json({
      message: 'pong'
    });
  } catch (error) {
    next(error);
  }
});


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
