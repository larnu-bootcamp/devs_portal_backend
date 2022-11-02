import { Router } from 'express';
import { getAll} from './controller';

export const developersRouter = Router();

developersRouter.route('/')
  .get(getAll);
