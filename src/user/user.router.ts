import { Router } from 'express';
import AuthController from './auth.controller';



export const authLogin = Router();

authLogin.post('/', AuthController.login);


  
