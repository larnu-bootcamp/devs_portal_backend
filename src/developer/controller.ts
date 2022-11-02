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

export const registerDevelopers: RequestHandler = async(req, res, next)=> {
  try {
    await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Student)
      .values({
        ...req.body
      })
      .execute();
    
    res.status(200).json({
      message: 'New Developer user created successfully!',
      Name: req.body.name,
      lasname: req.body.lastName,
      email: req.body.email, 
      active: req.body.active 
    });
  } catch (error) {
    next(error);
  }
};