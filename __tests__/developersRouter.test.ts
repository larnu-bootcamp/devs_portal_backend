import { app } from '../src/app';
import { connectDb, AppDataSource } from '../src/data-source';
import { Student } from '../src/developer/entity';
import supertest from 'supertest';


beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('[developersRouter ⚡]', () => {

  describe('get /developers/', () => {
    const agent = supertest.agent(app);

    it('should show the info of all students in the bootcamp', async () => {
      const res = await agent.get('/api/v1/developers');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('students');
      expect(res.body.students).toBeInstanceOf(Array<Student>);
    });

    it('should return an empty array when there is no developer', async () => {
      const res = await agent.get('/api/v1/developers');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('students');
      expect(res.body.students).toBeInstanceOf(Array<Student>);
    });
  });
});

/*
* Register user developer
*/
describe('post /developers/larnu/register', () => {
  const request = supertest.agent(app);

  it('should be able to register a user in the database', async () => {
    const payload = {
      'name':'Nombre',
      'lastName':'Apellido1',
      'age':25,
      'city':'Bogota',
      'country':'Colombia', 
      'email':'ejemplo@correo.com',
      'active':true,
      'skills':['React', 'NodeJS'],
      'profession':'desarrollador',
      'description':'Esto es una descripcion',
      'github':'https://www.github.com',  
      'linkedin':'https://www.linkedin.com',
      'portfolio':'https://www.portfolio.com'
    };
    const { body, status } = await request
      .post('/api/v1/developers/register')
      .type('json')
      .send(payload);

    expect(status).toBe(200);
    expect(body.Name).toMatch('Nombre');
    expect(body.email).toMatch('ejemplo@correo.com');
    expect(body.active).toBeTruthy();
  });

  it('should throw 500 error if user already exists', async () => {
    const payload = {
      'name':'Nombre',
      'lastName':'Apellido1',
      'age':25,
      'city':'Bogota',
      'country':'Colombia', 
      'email':'ejemplo@correo.com',
      'active':true,
      'skills':['React', 'NodeJS'],
      'profession':'desarrollador',
      'description':'Esto es una descripcion',
      'github':'https://www.github.com',  
      'linkedin':'https://www.linkedin.com',
      'portfolio':'https://www.portfolio.com'
    };
    const { body, status } = await request
      .post('/api/v1/developers/larnu/register')
      .type('json')
      .send(payload);

      expect(status).toBe(500);
      expect(body).toHaveProperty('message'); 
  });
});

/*
* Update user developer
*/

describe('patch /developers/larnu/register/id', () => {
  const request = supertest.agent(app);

  it('You must be able to update a user in the database.', async () => {
    const payload = {
      'name':'NombreUpdate',
      'lastName':'ApellidoUpdate',
      'age':20,
      'city':'ciudadUpdate',
      'country':'paisUpdate', 
      'email':'correoUpdate@correo.com',
      'active':true,
      'skills':['skillUpdate1', 'skillUpdate2'],
      'profession':'Desarrollador Update',
      'description':'Actualizacion de datos',
      'github':'https://www.linkedin.com/Update',  
      'linkedin':'https://www.linkedin.com/Update',
      'portfolio':'https://www.linkedin.com/Update'
    };
    const { body, status } = await request
      .patch('/api/v1/developers/register/100')
      .type('json')
      .send(payload);

    expect(status).toBe(200);
    expect(body).toHaveProperty('message');
  });

  it('should throw 404 error if user id does not exist', async () => {
    const payload = {
      'name':'NombreUpdate',
      'lastName':'ApellidoUpdate',
      'age':20,
      'city':'ciudadUpdate',
      'country':'paisUpdate', 
      'email':'correoUpdate@correo.com',
      'active':true,
      'skills':['skillUpdate1', 'skillUpdate2'],
      'profession':'Desarrollador Update',
      'description':'Actualizacion de datos',
      'github':'https://www.linkedin.com/Update',  
      'linkedin':'https://www.linkedin.com/Update',
      'portfolio':'https://www.linkedin.com/Update'
    };
    const { body, status } = await request
      .patch('/api/v1/developers/register/1000')
      .type('json')
      .send(payload);

    expect(status).toBe(404);
    expect(body).toHaveProperty('message');
  });
});

