import { Router } from 'express';
import { getAll, uploadImage, updateImage, deleteImage, registerDevelopers, updateDevelopers } from './controller';
import processFileUpload from '../middlewares/processFileUpload';

export const developersRouter = Router();

developersRouter.route('/')
  .get(getAll);

developersRouter.route('/register').post(registerDevelopers);
developersRouter.route('/register/:id').patch(updateDevelopers);

developersRouter.route('/:id/photo')
  .post(processFileUpload, uploadImage)
  .patch(processFileUpload, updateImage)
  .delete(deleteImage);

