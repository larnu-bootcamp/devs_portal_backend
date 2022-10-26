import { BaseEntity } from 'typeorm';
import { Request, Response } from 'express';
import { User } from './entity';
import { AppDataSource } from '../data-source';


class AuthController extends BaseEntity {
  static login = async ( req: Request, res: Response) => {
    const { email, password } = req.body;

    if (! (email && password)) {
    console.log('se daño aqui');
    res.status(400).send();
    }

    const userRepository = AppDataSource.getRepository(User);
    try {
      const userLarnu = await userRepository.findOne({
        where: {email}});
      if (userLarnu && !userLarnu.isValidPassword(password)) {
        res.status(401).send('Usuario o Contraseña Incorrecta');
        return;
      } else if ((userLarnu && userLarnu.isValidPassword(password)) && userLarnu?.active === false) {
        res.status(401).send('Usuario inactivo');
        return;
      }
      res.status(200).json({ 
        Name: userLarnu?.name, 
        lasname: userLarnu?.lastName,
        rol: userLarnu?.role,
        access_token: userLarnu?.generateJWT() });
    }
    catch (error) {
      console.log('no entra');
      res.status(401).send(error);
    }
  };
}

export default AuthController;