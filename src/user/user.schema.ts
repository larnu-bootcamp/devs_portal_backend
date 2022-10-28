import * as zod from 'zod';
import { loginSchema } from './auth.schema';

export const userSchema = loginSchema.extend({
  body: zod.object({
    name: zod
      .string()
      .min(2, 'El campo Nombre es obligatorio '),
      
    lastName: zod
      .string({required_error: 'El campo apellido es obligatorio '})
      .min(2, 'El apellido es requerido'),
    email: zod
      .string()
      .email({message: 'Debe ser un correo electronico valido'})
      .min(1, 'El email es requerido'),
    password: zod
      .string()
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(new RegExp('.*[A-Z].*'))
      .regex(new RegExp('.*[a-z].*'))
      .regex(new RegExp('.*[0-9].*'))
      .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+=\'|{}\\[\\];:\\\\].*'), 'One special character')
      .min(8, 'La contraseña debe tener minimo 8 Caracteres'),
    active: zod
      .boolean(),
  }),
});
