import { Router } from 'express';
import { newUser } from './user.controller';

export const userRegister = Router();

userRegister.route('/register').post(newUser);

