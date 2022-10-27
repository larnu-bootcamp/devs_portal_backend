import { RequestHandler } from 'express';
import { User } from './entity';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcryptjs';
import Jwt  from 'jsonwebtoken';
import { HttpError } from '../helpers/HttpError';

export const login: RequestHandler = async(req, res, next) => {  
  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        email: req.body.email
      }
    });
      if (!user) {
        return next(new HttpError (404, 'user not found'));
      } else if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (!result) {
              return next(new HttpError (401, 'user does not have valid authentication credentials.'));
            } else if (user.active === false) {
              return next(new HttpError (401, 'Access Denied You dont have permission to access'));
            } else {
              const generateJWT = () => {
                return Jwt.sign( {  email: req.body.email },
                  'SECRET', { expiresIn: '1h' } );
              };
                res.json({
                   success: true,
                   Name: user?.name, 
                   lasname: user?.lastName,
                   rol: user.role,
                   active: user.active,
                   token: generateJWT()
                });
              }
        });
      }
  } catch (error) {
      next(error);
  }
};