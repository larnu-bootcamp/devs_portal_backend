import supertest from 'supertest';
import path from 'path';
import { deleteApp } from 'firebase/app';
import { fbStorage } from '../src/services/firebase.config';
import { connectFirebaseStorageEmulator } from '../src/services/fbStorageEmulator';
import { connectDb, AppDataSource } from '../src/data-source';
import { app } from '../src/app';
import { Student } from '../src/developer/entity';


beforeAll(async () => {
  connectFirebaseStorageEmulator();
  await connectDb();
});

afterAll(async () => {
  await AppDataSource.destroy();
  try {
    // destroys firebaseApp connection
    await deleteApp(fbStorage.app);
  } catch (error) {
    console.log(error);
  }
});

describe('[developersRouter ⚡]', () => {
  const agent = supertest.agent(app);

  describe('GET /developers/', () => {
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

  describe('POST /developers/{id}/photo', () => {
    it('should store an image in firebase/storage and a link in the DataBase', async () => {
      const res = await agent
        .post('/api/v1/developers/2/photo')
        .type('multipart/form-data')
        .attach('image', path.resolve(__dirname, '../img/BQZLI7XRYZDBZBUKWVEF5SUVQU.jpg'));

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('student');
      expect(res.body.student).toHaveProperty('image');
      expect(res.body.student.image).toHaveProperty('url');
      expect(res.body.student.image).toHaveProperty('id');
    });

    it('should failed if image size > 4 megaBytes', async () => {
      const res = await agent
        .post('/api/v1/developers/2/photo')
        .type('multipart/form-data')
        .attach('image', path.resolve(__dirname, '../img/Snake_River_(5mb).jpg'));

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('File too large');
    });

    it('should failed if fileupload is not an /image/(jpeg|jpg|png|svg|webp)$/', async () => {
      const res = await agent
        .post('/api/v1/developers/2/photo')
        .type('multipart/form-data')
        .attach('image', path.resolve(__dirname, '../img/1666860634fireball-flames.svg'));

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('file format not accepted');
    });

    it('should failed if fileupload is a text file', async () => {
      const res = await agent
        .post('/api/v1/developers/2/photo')
        .type('multipart/form-data')
        .attach('image', path.resolve(__dirname, '../img/image-test.txt'));

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('file format not accepted');
    });
  });
});
