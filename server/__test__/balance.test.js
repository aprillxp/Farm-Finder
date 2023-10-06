const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { hash } = require('../helpers/bcrypt');

let access_token_investor = '';

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert('Investors', [
    {
      username: 'John Doe',
      email: 'invest@mail.com',
      password: hash('testing'),
      phoneNumber: '07142421424',
      balance: 100000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await sequelize.queryInterface.bulkInsert('Balances', [
    {
      balance: 100000,
      userId: 1,
      status: 'success',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const responseInvestors = await request(app)
    .post('/users/investors/login')
    .send({
      email: 'invest@mail.com',
      password: 'testing',
    });

  access_token_investor = responseInvestors.body.access_token;
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete('Balances', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete('Investors', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe('GET /balances', () => {
  it('responds with status 200 when success get all balances', async () => {
    const response = await request(app).get('/balances')
    .set('access_token', access_token_investor);
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty('userId');
    expect(response.body[0]).toHaveProperty('balance');
    expect(response.body[0]).toHaveProperty('status');
    expect(response.body[0]).toHaveProperty('Investor');
    expect(response.body[0].Investor).toHaveProperty('username');
    expect(response.body[0].Investor).toHaveProperty('email');
    expect(response.body[0].Investor).toHaveProperty('phoneNumber');
  });
});

describe('GET /balances/:id', () => {
  it('responds with status 200 when success get balances by id', async () => {
    const response = await request(app)
      .get('/balances/1')
      .set('access_token', access_token_investor);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('Investor');
    expect(response.body.Investor).toHaveProperty('username');
    expect(response.body.Investor).toHaveProperty('email');
    expect(response.body.Investor).toHaveProperty('phoneNumber');
    expect(response.body.Investor).toHaveProperty('balance');
  });
  it('responds with status 404 when not found', async () => {
    const response = await request(app)
      .get('/balances/1000')
      .set('access_token', access_token_investor);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'not found');
  });
});

describe('POST /balances', () => {
  it('responds with status 201 when success post balances', async () => {
    const response = await request(app)
      .post('/balances')
      .send({
        userId: 1,
        balance: 100000,
        status: 'success',
      })
      .set('access_token', access_token_investor);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('status');
  });

  it('responds with status 400 when userId is required/null', async () => {
    const response = await request(app)
      .post('/balances')
      .send({
        userId: null,
        balance: 100000,
        status: 'success',
      })
      .set('access_token', access_token_investor);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'userId is required');
  });

  it('responds with status 400 when use same id', async () => {
    const response = await request(app)
      .post('/balances')
      .send({
        userId: 1,
        balance: 0,
      })
      .set('access_token', access_token_investor);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'balance is required');
  });
  it('should response with status 401 when invalid token', async () => {
    const response = await request(app)
      .post('/balances')
      .set('access_token', access_token_investor + '1');
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });
});

describe('PUT /balance/status/:balanceId', () => {
  it('should response with status 200 when success', async () => {
    const response = await request(app)
      .put('/balances/status/1')
      .send({
        status: 'success',
      })
      .set('access_token', access_token_investor);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('status');
  });
  it('should response with status 404 when not found', async () => {
    const response = await request(app)
      .put('/balances/status/10000')
      .send({
        status: 'success',
      })
      .set('access_token', access_token_investor);


    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'not found');
  });
  it('should response with status 401 when invalid token', async () => {
    const response = await request(app)
      .put('/balances/status/10')
      .set('access_token', access_token_investor + '1');

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });
  it('should response with status 400 when enpty status', async () => {
    const response = await request(app)
      .put('/balances/status/10')
      .set('access_token', access_token_investor);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'status is required');
  });
});

describe('DELETE /balance/:balanceId', () => {
  it('should response with status 200 when success', async () => {
    const response = await request(app)
      .delete('/balances/1')
      .set('access_token', access_token_investor);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message');
  });
  it('should response with status 404 when not found', async () => {
    const response = await request(app)
      .delete('/balances/20')
      .set('access_token', access_token_investor);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'not found');
  });
  it('should response with status 401 when invalid token', async () => {
    const response = await request(app)
      .delete('/balances/20')
      .set('access_token', access_token_investor + '1');

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });
});
