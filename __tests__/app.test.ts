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
