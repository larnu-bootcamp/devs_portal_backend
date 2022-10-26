import { app } from '../src/app';
//import { User } from '../src/user/entity';
import chai from 'chai';
import { connectDb, AppDataSource } from '../src/data-source';
import supertest from 'supertest';


const { expect } = chai;

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
    const { status } = await request
      .post('/api/v1/auth/login')
      .type('json')
      .send(payload);
    expect(status).to.equal(200);
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
    expect(status).to.equal(401);
    expect(body.message).contains('Usuario o Contraseña Incorrecta');
  });

 });

