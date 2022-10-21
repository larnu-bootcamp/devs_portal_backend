import { app } from '../src/app';
import { defaultErrorHandler } from '../src/middlewares/defaultErrorHandler';
import supertest from 'supertest';


describe('[express server ⚡]', () => {
  // We hard-code this RequestHandler just for testing, we'll 
  // encapsulate this logic in a router instead.
  app.use('/api/v1/ping', async (req, res, next) => {
    try {
      res.status(200).json({
        message: 'pong'
      });
    } catch (error) {
      next(error);
    }
  });
  app.use('/api/v1/', defaultErrorHandler);
  const agent = supertest.agent(app);

  it('should respond pong', async () => {
    const res = await agent.get('/api/v1/ping');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('pong');
  });
});
