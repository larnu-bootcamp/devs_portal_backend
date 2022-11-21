import { Router } from 'express';
import { getAll, uploadImage, updateImage, deleteImage, registerDevelopers, updateDevelopers } from './controller';
import processFileUpload from '../middlewares/processFileUpload';
import { schemaValidator } from '../middlewares/schemaValidation';
import { studentShema } from './student.shema';


export const developersRouter = Router();

developersRouter.route('/')
  .get(getAll)
  .post(schemaValidator(studentShema), registerDevelopers);

developersRouter.route('/:id/photo')
  .post(processFileUpload, uploadImage)
  .patch(processFileUpload, updateImage)
  .delete(deleteImage);

developersRouter.route('/:id')
  .patch(schemaValidator(studentShema), updateDevelopers);

