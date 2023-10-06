const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { hash } = require('../helpers/bcrypt');

let access_token_farmer = '';
let access_token_investor = '';

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert('Farmers', [
    {
      username: 'Waryo',
      email: 'waryo@mail.com',
      password: hash('waryo'),
      phoneNumber: '0813234344',
      status: 'Active',
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Tarmudi',
      email: 'tarmudi@mail.com',
      password: hash('tarmudi'),
      phoneNumber: '0817934344',
      status: 'Active',
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Jono',
      email: 'jono@mail.com',
      password: hash('jono'),
      phoneNumber: '08170974344',
      status: 'Active',
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

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
  const responseFarmers = await request(app).post('/users/farmers/login').send({
    email: 'waryo@mail.com',
    password: 'waryo',
  });
  access_token_farmer = responseFarmers.body.access_token;
  const responseInvestors = await request(app)
    .post('/users/investors/login')
    .send({
      email: 'invest@mail.com',
      password: 'testing',
    });

  access_token_investor = responseInvestors.body.access_token;
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete('Farmers', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
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

describe('Farmer Test', () => {
  describe('POST /users/farmers/login', () => {
    it('should response with status 200 when Success', async () => {
      const response = await request(app).post('/users/farmers/login').send({
        email: 'waryo@mail.com',
        password: 'waryo',
      });
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('access_token');
    });

    it('should response with status 400 when password is empty', async () => {
      const response = await request(app).post('/users/farmers/login').send({
        email: 'waryo@mail.com',
        password: '',
      });
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Email/Password required'
      );
    });
    it('should response with status 400 when password is null', async () => {
      const response = await request(app).post('/users/farmers/login').send({
        email: 'waryo@mail.com',
      });
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Email/Password required'
      );
    });
    it('should response with status 400 when email is empty', async () => {
      const response = await request(app).post('/users/farmers/login').send({
        email: '',
        password: 'waryo',
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Email/Password required'
      );
    });
    it('should response with status 400 when email is null', async () => {
      const response = await request(app).post('/users/farmers/login').send({
        email: null,
        password: 'waryo',
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Email/Password required'
      );
    });
    it('should response with status 400 when email is not found', async () => {
      const response = await request(app).post('/users/farmers/login').send({
        email: "asdvgsdvwg@mail.com",
        password: 'waryo',
      });

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Email/Password invalid'
      );
    });
    it('should response with status 401 when wrong password', async () => {
      const response = await request(app).post('/users/farmers/login').send({
        email: 'waryo@mail.com',
        password: 'waryo12',
      });

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Email/Password invalid');
    });
  });

  describe('POST /users/farmers/register', () => {
    it('should response with status 201 when Success', async () => {
      const response = await request(app).post('/users/farmers/register').send({
        username: 'test',
        email: 'test1@mail.com',
        password: 'test1',
        address: 'test',
        phoneNumber: 'test',
      });
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('access_token');
    });
    it('should response with status 400 when username empty/null', async () => {
      const response = await request(app).post('/users/farmers/register').send({
        username: '',
        email: 'test1@mail.com',
        password: 'test1',
        address: 'test',
        phoneNumber: 'test',
      });
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Username is required');
    });

    it('should response with status 400 when email empty/null', async () => {
      const response = await request(app).post('/users/farmers/register').send({
        username: 'test',
        email: '',
        password: 'test1',
        address: 'test',
        phoneNumber: 'test',
      });
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Email is required');
    });
    it('should response with status 400 when email format invalid', async () => {
      const response = await request(app).post('/users/farmers/register').send({
        username: 'test',
        email: 'test1mail.com',
        password: 'test1',
        address: 'test',
        phoneNumber: 'test',
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Email format wrong');
    });
    it('should response with status 400 when email is registered', async () => {
      const response = await request(app).post('/users/farmers/register').send({
        username: 'test',
        email: 'test1@mail.com',
        password: 'test1',
        address: 'test',
        phoneNumber: 'test',
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Email must be unique');
    });
    it('should response with status 400 when empty/null password', async () => {
      const response = await request(app).post('/users/farmers/register').send({
        username: 'test',
        email: 'test1@mail.com',
        password: '',
        address: 'test',
        phoneNumber: 'test',
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Password is required');
    });
  });

  describe('GET /users/farmers/:id', () => {
    it('should response with status 200 when Success', async () => {
      const response = await request(app).get('/users/farmers/1');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('address');
      expect(response.body).toHaveProperty('phoneNumber');
    });

    it('should response with status 404 when farmer id not found', async () => {
      const response = await request(app).get('/users/farmers/1000');

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Farmer with id 1000 not found'
      );
    });
  });

  describe('PATCH /users/farmers/:id', () => {
    it('should response with status 200 when success', async () => {
      const response = await request(app)
        .patch('/users/farmers/1')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Farmer with id 1 unactived'
      );
    });
    it('should response with status 404 when not found', async () => {
      const response = await request(app)
        .patch('/users/farmers/1000')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(404); 
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Farmer with id 1000 not found' 
      );
    });

    it('should response with status 401 when token invalid', async () => {
      const response = await request(app)
        .patch('/users/farmers/1')
        .set('access_token', access_token_farmer + '1');

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
  });
});

describe('Investor', () => {
  describe('GET /users/investors', () => {
    it('should response with status 200 when Success', async () => {
      const response = await request(app).get('/users/investors');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('username');
      expect(response.body[0]).toHaveProperty('email');
      expect(response.body[0]).toHaveProperty('phoneNumber');
      expect(response.body[0]).toHaveProperty('balance');
    });
  });

  describe('POST /users/investors/register', () => {
    it('should response with status 201 when Success', async () => {
      const response = await request(app)
        .post('/users/investors/register')
        .send({
          username: 'test investor',
          email: 'investor1@mail.com',
          password: 'investor1',
          phoneNumber: '088734855',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('access_token');
    });
    it('should response with status 400 when username is empty/null', async () => {
      const response = await request(app)
        .post('/users/investors/register')
        .send({
          username: null,
          email: 'investor1@mail.com',
          password: 'investor1',
          phoneNumber: '088734855',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Username is required');
    });
    it('should response with status 400 when email is empty/null', async () => {
      const response = await request(app)
        .post('/users/investors/register')
        .send({
          username: 'test investor',
          email: null,
          password: 'investor1',
          phoneNumber: '088734855',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email is required');
    });
    it('should response with status 400 when email is registered', async () => {
      const response = await request(app)
        .post('/users/investors/register')
        .send({
          username: 'test investor',
          email: 'investor1@mail.com',
          password: 'investor1',
          phoneNumber: '088734855',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email must be unique');
    });
    it('should response with status 400 when invalid email format', async () => {
      const response = await request(app)
        .post('/users/investors/register')
        .send({
          username: 'test investor',
          email: 'investor1mail.com',
          password: 'investor1',
          phoneNumber: '088734855',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email format wrong');
    });
    it('should response with status 400 when password is empty/null', async () => {
      const response = await request(app)
        .post('/users/investors/register')
        .send({
          username: 'test investor',
          email: 'investor1@mail.com',
          password: '',
          phoneNumber: '088734855',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Password is required');
    });
    it('should response with status 400 when password is empty/null', async () => {
      const response = await request(app)
        .post('/users/investors/register')
        .send({
          username: 'test investor',
          email: 'investor1@mail.com',
          password: 'investor1',
          phoneNumber: '',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'message',
        'Phone number is required'
      );
    });
  });

  describe('POST /users/investors/login', () => {
    it('should response with status 200 when Success', async () => {
      const response = await request(app).post('/users/investors/login').send({
        email: 'investor1@mail.com',
        password: 'investor1',
      });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('access_token');
    });
    it('should response with status 401 when not found email', async () => {
      const response = await request(app).post('/users/investors/login').send({
        email: 'investor1sdsd@mail.com',
        password: 'investor1',
      });

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Email/Password invalid');
    });
    it('should response with status 400 when email is empty/null', async () => {
      const response = await request(app).post('/users/investors/login').send({
        email: null,
        password: 'investor1',
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Email/Password required'
      );
    });
    it('should response with status 400 when password is empty/null', async () => {
      const response = await request(app).post('/users/investors/login').send({
        email: 'investor1@mail.com',
        password: '',
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Email/Password required'
      );
    });
    it('should response with status 400 when password is invalid', async () => {
      const response = await request(app).post('/users/investors/login').send({
        email: 'investor1@mail.com',
        password: 'srerewere', 
      });

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Email/Password invalid');
    });
  });

  describe('GET /users/investors/:id', () => {
    it('should response with status 200 when success', async () => {
      const response = await request(app).get('/users/investors/1');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('phoneNumber');
    });
    it('should response with status 200 when success', async () => {
      const response = await request(app).get('/users/investors/1000');

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Investor with id 1000 not found'
      );
    });
  })
});
