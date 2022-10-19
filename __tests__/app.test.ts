import { app } from '../src/app';
import { defaultErrorHandler } from '../src/middlewares/defaultErrorHandler';
import supertest from 'supertest';


describe('[express server ⚡]', () => {
  app.use('/api/v1/', defaultErrorHandler);
  const agent = supertest.agent(app);

  it('should respond pong', async () => {
    const res = await agent.get('/api/v1/ping');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('pong');
  });
});
