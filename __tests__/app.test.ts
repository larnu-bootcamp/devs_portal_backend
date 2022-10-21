import { app } from '../src/app';
import supertest from 'supertest';


describe('[express server ⚡]', () => {
  const agent = supertest.agent(app);

  it('should respond pong', async () => {
    const res = await agent.get('/api/v1/ping');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('pong');
  });
});
