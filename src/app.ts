import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { defaultErrorHandler } from './middlewares/defaultErrorHandler';
import { developersRouter } from './developer/router';
import { userRouter } from './user/user.router';
import { schemaValidator } from './middlewares/schemaValidation';
import { userSchema, loginSchema } from './user/user.schema';
import { studentShema } from './developer/developer.schema';

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

app.use('/api/v1/auth', schemaValidator(loginSchema), userRouter );
app.use('/api/v1/larnu', schemaValidator(userSchema), userRouter);

app.use('/api/v1/developers/larnu', schemaValidator(studentShema), developersRouter);

// 3. defaultErrorHandler middleware
app.use('/api/v1/', defaultErrorHandler);
