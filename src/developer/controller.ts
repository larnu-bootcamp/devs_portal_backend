import { RequestHandler } from 'express';
import { Student } from './entity';
import { AppDataSource } from '../data-source';
import { HttpError } from '../helpers/HttpError';


export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const students = await AppDataSource.getRepository(Student).find();

    if (!students) {
      return next(new HttpError(404, 'no developers found'));
    }
    res.status(200).json({
      students
    });
  } catch (error) {
    next(error);
  }
};
