import { Router } from 'express';
import { getAll, registerDevelopers, updateDevelopers } from './controller';


export const developersRouter = Router();

developersRouter.route('/')
  .get(getAll);

developersRouter.route('/register').post(registerDevelopers);
developersRouter.route('/register/:id').patch(updateDevelopers);