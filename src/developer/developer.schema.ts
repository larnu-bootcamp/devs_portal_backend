import * as zod from 'zod';

export const studentShema = zod.object({
  body: zod.object({
    name: zod 
      .string()
      .min(2, 'El campo Nombre es obligatorio '),
    lastName: zod 
      .string()
      .min(2, 'El campo Apellido es obligatorio '), 
    age: zod
      .number(),
    city: zod
      .string()
      .min(2, 'El campo Ciudad es requerido' ),
    country: zod
      .string()
      .min(2, 'El campo Pais es requerido' ),
    email: zod
      .string()
      .email({message: 'Debe ser un correo electronico valido'})
      .min(2, 'El campo correo es requerido' ),
    active: zod
      .boolean(),
    skills: zod
      .string()
      .array(),
    profession: zod
      .string()
      .min(2, 'El campo Pais es requerido' ),
    description: zod 
      .string()
      .min(2, 'El campo Pais es requerido' ), 
    github: zod
      .string()
      .url({ message: 'Invalid url' }),
    linkedin: zod
      .string()
      .url({ message: 'Invalid url' }),  
    portfolio: zod
      .string()
      .url({ message: 'Invalid url' }),

  }),
});

