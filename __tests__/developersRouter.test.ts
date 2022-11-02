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