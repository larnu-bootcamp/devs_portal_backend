import * as zod from 'zod';

export const loginSchema = zod.object({
  body: zod.object({
    email: zod
      .string()
      .email({message: 'Debe ser un correo electronico valido'})
      .min(1, 'El email es requerido'),
    password: zod
      .string()
      .min(8, 'La contraseña debe tener minimo 8 Caracteres'),
  }),
});