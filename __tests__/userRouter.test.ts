import { app } from '../src/app';
import { connectDb, AppDataSource } from '../src/data-source';
import supertest from 'supertest';



beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

const request = supertest.agent(app);

describe('Test Login', () => {  
  it('should allow to login', async () => {
    const payload = {
      'email': 'Lurline44@hotmail.com',
      'password': '12345678'
    };
    const { body, status } = await request
      .post('/api/v1/auth/login')
      .type('json')
      .send(payload);
    
      expect(status).toBe(200);
      expect(body.Name).toMatch('Lurline');
      expect(body.lasname).toMatch('Bode');
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

  it('should allow to login', async () => {
    const payload = {
      'email': 'Lurline44@hotmail.com',
      'password': '12345678Pass'
    };
    const { body, status } = await request
      .post('/api/v1/auth/login')
      .type('json')
      .send(payload);
    
      console.log(status);
      expect(status).toBe(401);
      expect(body).toHaveProperty('message');
      
  });

  it('Acceso denegate', async () => {
    const payload = {
      'email': 'Jennie84@yahoo.com',
      'password': '12345678'
    };
    const { body, status } = await request
      .post('/api/v1/auth/login')
      .type('json')
      .send(payload);
  
      expect(status).toBe(401);
      expect(body.active).toBeFalsy();
      
  });

  
});
