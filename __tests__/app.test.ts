import { app } from '../src/app';
import { connectDb, AppDataSource } from '../src/data-source';
import supertest from 'supertest';


beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('[express server ⚡]', () => {
  const agent = supertest.agent(app);

  it('should respond pong', async () => {
    const res = await agent.get('/api/v1/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('pong');
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