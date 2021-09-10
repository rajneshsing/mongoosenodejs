const request = require('supertest');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const app = require('../../server');
//const config = require('../../src/config/config');
const mongoUrl = 'mongodb://127.0.0.1:27017/testdbss';
describe('Record routes', () => {
  beforeAll(async () => {
  await mongoose.connect(mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })});
  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe('GET /api/users', () => {
	it('should return 200 and successfully create fetch data from DB', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200);
      expect(res.body).toEqual({
        is_error:'false',
        message: 'Success',
        data: expect.any(Array),
      });
    });

    it('should return 200 and fetch all data if request body is missing', async () => {
      const res = await request(app).post('/api/users').expect(200);

      expect(res.body).toEqual({
        is_error:'false',
        message: 'Success',
        data: expect.any(Array),
      });
    });

  });
});