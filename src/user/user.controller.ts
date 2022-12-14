import { RequestHandler } from 'express';
import { User } from './entity';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcryptjs';
import Jwt  from 'jsonwebtoken';
import { HttpError } from '../helpers/HttpError';

export const newUser: RequestHandler = async(req, res, next) => {
  try {

    const userRepository = await AppDataSource.getRepository(User);

    const user = new User();
    user.name = req.body.name,
    user.lastName = req.body.lastName,
    user.email = req.body.email,
    user.password = bcrypt.hashSync(req.body.password, 8),
    user.active = req.body.active,
    await userRepository.save(user);

      res.status(200).json({
        message: 'New admin user created successfully!',
        userId: user?.id,
        Name: user?.name,
        email: user?.email, 
        active: user?.active  
      });
  } catch (error) {
    next(error);
  }
};


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
