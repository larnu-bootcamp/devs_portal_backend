import { RequestHandler } from 'express';
import { User } from './entity';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcryptjs';

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

