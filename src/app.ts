import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { connectStorageEmulator } from 'firebase/storage';
import { fbStorage } from './services/firebase/firebase.config';
import { defaultErrorHandler } from './middlewares/defaultErrorHandler';
import { developersRouter } from './developer/router';
import { userRouter } from './user/user.router';
import { schemaValidator } from './middlewares/schemaValidation';
import { userSchema, loginSchema } from './user/user.schema';

export const app = express();

// 1. middlewares
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
  connectStorageEmulator(fbStorage, 'localhost', 9199);
}
app.use(express.json());
app.use(cors());
app.use('/', swaggerUi.serve, swaggerUi.setup(YAML.load(path.resolve('./docs/docApiLarnUDev.yaml'))));

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

app.use('/api/v1/auth', schemaValidator(loginSchema), userRouter);
app.use('/api/v1/larnu', schemaValidator(userSchema), userRouter);

// 3. defaultErrorHandler middleware
app.use('/api/v1/', defaultErrorHandler);
