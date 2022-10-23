import { Router } from 'express';
import { getAll } from '../controllers/developers.controller';


export const developersRouter = Router();

developersRouter.route('/')
  .get(getAll);
