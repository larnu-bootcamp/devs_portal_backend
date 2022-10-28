import { Router } from 'express';
import {login} from './auth.controller';

export const authLogin = Router();

authLogin.route('/login/').post(login);

