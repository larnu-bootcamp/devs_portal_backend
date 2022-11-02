import * as zod from 'zod';

export const studentShema = zod.object ({
  body: zod.object({
    name: zod
      .string()
      .min(2, 'El campo Nombre es obligatorio '),
    lastName: zod
      .string()
      .min(2, 'El campo Apellido es obligatorio '),
    age: zod
      .number()
      .min(1, 'El campo Edad es obligatorio '),
    city: zod
      .string()
      .min(2, 'El campo Ciudad es obligatorio '),
    country: zod
      .string()
      .min(2, 'El campo Pais es obligatorio '), 
    email: zod
      .string()
      .email({message: 'Debe ser un correo electronico valido'})
      .min(2, 'El campo Correo es obligatorio '),
    active: zod
      .boolean(),
    skills: zod
      .string()
      .array()
      .nonempty({
        message: 'Campo obligatorio, no puede estar vacio'
      }),
    profession: zod
      .string()
      .min(2, 'El campo Nombre es obligatorio ')
      .optional(),
    description: zod
      .string()
      .min(2, 'El campo Nombre es obligatorio '),
    github: zod
      .string()
      .url()
      .min(2, 'El campo Nombre es obligatorio '),  
    linkedin: zod
      .string()
      .url()
      .min(2, 'El campo Nombre es obligatorio '),
    portfolio: zod
      .string()
      .url()
      .min(2, 'El campo Nombre es obligatorio '),    
  })
});