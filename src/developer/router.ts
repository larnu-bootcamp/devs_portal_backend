import { Router } from 'express';
import { getAll, uploadImage, updateImage, deleteImage } from './controller';
import processFileUpload from '../middlewares/processFileUpload';


import { getAll} from './controller';


export const developersRouter = Router();

developersRouter.route('/')
  .get(getAll);

developersRouter.route('/:id/photo')
  .post(processFileUpload, uploadImage)
  .patch(processFileUpload, updateImage)
  .delete(deleteImage);
