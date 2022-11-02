import { Router } from 'express';
import { getAll, registerDevelopers } from './controller';


export const developersRouter = Router();

developersRouter.route('/')
  .get(getAll);

developersRouter.route('/register').post(registerDevelopers);
