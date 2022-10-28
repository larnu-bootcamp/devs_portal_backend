import { app } from '../src/app';
import { connectDb, AppDataSource } from '../src/data-source';
import supertest from 'supertest';

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await AppDataSource.destroy();
});



/*
* Register user Admin
*/


describe('Test Register Admin User ', () => {  
  const request = supertest.agent(app);
  it('should be able to register a user in the database', async () => {
    const payload = {
      'name': 'admin',
      'lastName': 'larnu',
      'email': 'adminlarnu2@hotmail.com',
      'password': 'Admin.123',
      'active': true
    };
    const { body, status } = await request
      .post('/api/v1/larnu/register')
      .type('json')
      .send(payload);
     
    expect(status).toBe(200);
    expect(body.Name).toMatch('admin');
    expect(body.email).toMatch('adminlarnu2@hotmail.com');
    expect(body.active).toBeTruthy();
  });

  it('should throw 500 error if user already exists', async () => {
    const payload = {
      'name': 'admin',
      'lastName': 'larnu',
      'email': 'adminlarnu2@hotmail.com',
      'password': 'Admin.123',
      'active': true
    };
    const { body, status } = await request
      .post('/api/v1/larnu/register')
      .type('json')
      .send(payload);
      
    expect(status).toBe(500);
    expect(body).toHaveProperty('message');  
  });

  it('should register a user with inactive status', async () => {
    const payload = {
      'name': 'admin',
      'lastName': 'larnu',
      'email': 'adminlarnu3@hotmail.com',
      'password': 'Admin.123',
      'active': false
    };
    const { body, status } = await request
      .post('/api/v1/larnu/register')
      .type('json')
      .send(payload);
     
    expect(status).toBe(200);
    expect(body.Name).toMatch('admin');
    expect(body.email).toMatch('adminlarnu3@hotmail.com');
    expect(body.active).toBeFalsy();
  });

});

/*
* Login user Admin
*/



describe('Test Login', () => {  
  const request = supertest.agent(app);
  it('should allow to login', async () => {
    const payload = {
      'email': 'adminlarnu2@hotmail.com',
      'password': 'Admin.123'
    };
    const { body, status } = await request
      .post('/api/v1/auth/login')
      .type('json')
      .send(payload);
    
    expect(status).toBe(200);
    expect(body.Name).toMatch('admin');
    expect(body.lasname).toMatch('larnu');
    expect(body.active).toBeTruthy();
      
  });

  it('It should throw 404 if the email is not correctIt should throw 404 if the email is not correct', async () => {
    const payload = {
      'email': 'failed@email.com',
      'password': '12345678'
    };
    const { body, status } = await request
      .post('/api/v1/auth/login')
      .type('json')
      .send(payload);
    
    expect(status).toBe(404);
    expect(body).toHaveProperty('message');
  });

  it('should throw 401 error due to credential error', async () => {
    const payload = {
      'email': 'adminlarnu2@hotmail.com',
      'password': '12345678Pass.'
    };
    const { body, status } = await request
      .post('/api/v1/auth/login')
      .type('json')
      .send(payload);
    
    expect(status).toBe(401);
    expect(body).toHaveProperty('message');
      
  });

  it('Acceso denegate', async () => {
    const payload = {
      'email': 'adminlarnu3@hotmail.com',
      'password': 'Admin.123'
    };
    const { body, status } = await request
      .post('/api/v1/auth/login')
      .type('json')
      .send(payload);
  
    expect(status).toBe(401);
    expect(body.active).toBeFalsy();
  });  
});
