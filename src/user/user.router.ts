import { Router } from 'express';
import { newUser, login } from './user.controller';


export const userRouter = Router();

userRouter.route('/register').post(newUser);
userRouter.route('/login/').post(login);

