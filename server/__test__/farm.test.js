const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { hash } = require('../helpers/bcrypt');
const { sign } = require('jsonwebtoken');
const { verify } = require('../helpers/jwt');
let access_token_farmer = '';
let access_token_farmer_fake = '';
let access_token_farmer_fake2 = '';
let farmerId = '';

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert(
    'Farmers',
    ('Farmers',
    [
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
    ])
  );

  await sequelize.queryInterface.bulkInsert(
    'Investors',
    [
      {
        username: 'John Doe',
        email: 'invest@mail.com',
        password: hash('testing'),
        phoneNumber: '07142421424',
        balance: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
  await sequelize.queryInterface.bulkInsert(
    'Balances',
    [
      {
        balance: 100000,
        userId: 1,
        status: 'success',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
  const data = require('../data/farm.json');
  data.forEach((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });
  await sequelize.queryInterface.bulkInsert('Farms', data, {});
  const responseFarmers = await request(app).post('/users/farmers/login').send({
    email: 'waryo@mail.com',
    password: 'waryo',
  });
  access_token_farmer = responseFarmers.body.access_token;
  let { id } = verify(access_token_farmer);
  farmerId = id;
  access_token_farmer_fake = sign({ id: 34 }, process.env.SECRET_JWT);
  access_token_farmer_fake2 = sign({ id: 34 }, 'hjbdbshadg');
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete('Farms', null, {
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
  await sequelize.queryInterface.bulkDelete('Farmers', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe('Farms Test', () => {
  describe('GET /farms', () => {
    it('should response white status 200 when success', async () => {
      const response = await request(app).get('/farms');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('city');
      expect(response.body[0]).toHaveProperty('address');
      expect(response.body[0]).toHaveProperty('longitude');
      expect(response.body[0]).toHaveProperty('latitude');
      expect(response.body[0]).toHaveProperty('mainImgUrl');
      expect(response.body[0]).toHaveProperty('status', 'verified');
      expect(response.body[0]).toHaveProperty('benefits');
      expect(response.body[0]).toHaveProperty('sharePercent');
      expect(response.body[0]).toHaveProperty('price');
      expect(response.body[0]).toHaveProperty('FarmerId', farmerId);
      expect(response.body[0]).toHaveProperty('Images');
    });
  });
  describe('GET /farms/my-farms/farms', () => {
    it('should response white status 200 when success', async () => {
      const response = await request(app).get('/farms/my-farms/farms');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('city');
      expect(response.body[0]).toHaveProperty('address');
      expect(response.body[0]).toHaveProperty('longitude');
      expect(response.body[0]).toHaveProperty('latitude');
      expect(response.body[0]).toHaveProperty('mainImgUrl');
      expect(response.body[0]).toHaveProperty('status', 'verified');
      expect(response.body[0]).toHaveProperty('benefits');
      expect(response.body[0]).toHaveProperty('sharePercent');
      expect(response.body[0]).toHaveProperty('price');
      expect(response.body[0]).toHaveProperty('FarmerId', farmerId);
      expect(response.body[0]).toHaveProperty('Images');
    });
  });

  describe('GET /farms/:farmId', () => {
    it('should response white status 200 when success', async () => {
      const response = await request(app).get('/farms/1');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('city');
      expect(response.body).toHaveProperty('address');
      expect(response.body).toHaveProperty('longitude');
      expect(response.body).toHaveProperty('latitude');
      expect(response.body).toHaveProperty('mainImgUrl');
      expect(response.body).toHaveProperty('benefits');
      expect(response.body).toHaveProperty('sharePercent');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('FarmerId', farmerId);
      expect(response.body).toHaveProperty('Images');
    });
    it('should response white status 404 when farmId not found', async () => {
      const response = await request(app).get('/farms/25');

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Farm not found');
    });
  });

  describe('GET /my-farms/farm', () => {
    it('should response status 200 when success', async () => {
      const response = await request(app)
        .get('/farms/my-farms/farm')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('city');
      expect(response.body[0]).toHaveProperty('address');
      expect(response.body[0]).toHaveProperty('longitude');
      expect(response.body[0]).toHaveProperty('latitude');
      expect(response.body[0]).toHaveProperty('mainImgUrl');
      expect(response.body[0]).toHaveProperty('benefits');
      expect(response.body[0]).toHaveProperty('sharePercent');
      expect(response.body[0]).toHaveProperty('price');
      expect(response.body[0]).toHaveProperty('FarmerId', farmerId);
      expect(response.body[0]).toHaveProperty('Images');
      expect(response.body[0].Images).toBeInstanceOf(Array);
    });
    it('should response status 404 when not found farmerId', async () => {
      const response = await request(app)
        .get('/farms/my-farms/farm')
        .set('access_token', access_token_farmer_fake);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
    it('should response status 404 when invalid token key', async () => {
      const response = await request(app)
        .get('/farms/my-farms/farm')
        .set('access_token', access_token_farmer_fake2);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
    it('should response status 404 when not send token', async () => {
      const response = await request(app).get('/farms/my-farms/farm');
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
  });

  describe('GET /farms/my-farm/:farmId', () => {
    it('should response status 200 when success', async () => {
      const response = await request(app)
        .get('/farms/my-farms/1')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('city');
      expect(response.body).toHaveProperty('address');
      expect(response.body).toHaveProperty('longitude');
      expect(response.body).toHaveProperty('latitude');
      expect(response.body).toHaveProperty('mainImgUrl');
      expect(response.body).toHaveProperty('benefits');
      expect(response.body).toHaveProperty('sharePercent');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('FarmerId', farmerId);
      expect(response.body).toHaveProperty('Images');
    });

    it('should response status 404 when not found', async () => {
      const response = await request(app)
        .get('/farms/my-farms/25')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Farm not found');
    });

    it('should response status 404 when not found', async () => {
      const response = await request(app).get('/farms/my-farms/25');

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });

    it('should response status 404 when not found', async () => {
      const response = await request(app)
        .get('/farms/my-farms/25')
        .set('access_token', access_token_farmer_fake);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });

    it('should response status 404 when not found', async () => {
      const response = await request(app)
        .get('/farms/my-farms/25')
        .set('access_token', access_token_farmer_fake2);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
  });

  describe('DELETE /farms/my-farms/:farmId', () => {
    it('should response status 200 when success', async () => {
      const response = await request(app)
        .delete('/farms/my-farms/2')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Johny Dairy successfully deleted'
      );
    });
    it('should response status 403 when not have authorization', async () => {
      const response = await request(app)
        .delete('/farms/my-farms/3')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(403);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'UnAuthorized');
    });
    it('should response status 401 when not found id', async () => {
      const response = await request(app)
        .delete('/farms/my-farms/3')
        .set('access_token', access_token_farmer_fake);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
    it('should response status 401 when invalid token key', async () => {
      const response = await request(app)
        .delete('/farms/my-farms/3')
        .set('access_token', access_token_farmer_fake2);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
    it('should response status 400 when status is not relate', async () => {
      const response = await request(app)
        .delete('/farms/my-farms/35')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty(
        'message',
        'report with id undefined not found'
      );
    });
  });
  describe('PATCH /farms/:farmId', () => {
    it('should response status 200 when success', async () => {
      const response = await request(app)
        .patch('/farms/1')
        .send({ status: 'verified' })
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Farm with id: 1 status updated to verified'
      );
    });

    it('should response status 400 when status is not relate', async () => {
      const response = await request(app)
        .patch('/farms/1')
        .send({ status: 'test' })
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid status value');
    });

    it('should response status 400 when status is not relate', async () => {
      const response = await request(app)
        .patch('/farms/1')
        .send({ test: 'test' })
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid status value');
    });
  });
  describe('POST /farms/my-farms/farm', () => {
    it('should response 200 when success', async () => {
      const response = await request(app)
        .post('/farms/my-farms/farm')
        .field('name', 'Lestari Ayam')
        .field('category', 'Chicken')
        .field('city', 'Surabaya')
        .field('address', 'Jalan Timur 1')
        .field('latitude', -7.245312)
        .field('longitude', 112.758554)
        .field('videoUrl', 'https://www.youtube.com/watch?v=T9PFzLBVZvg')
        .field(
          'benefits',
          'Profit per periode penjualan akan diberikan sebagai dividend kepada investor'
        )
        .field('sharePercent', 50)
        .field('price', 300000)
        .attach('photoUrl', 'uploadimage/01.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/02.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/03.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/04.jpg')
        .set('access_token', access_token_farmer);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('name', 'Lestari Ayam');
      expect(response.body).toHaveProperty('category', 'Chicken');
      expect(response.body).toHaveProperty('city', 'Surabaya');
      expect(response.body).toHaveProperty('address', 'Jalan Timur 1');
      expect(response.body).toHaveProperty('latitude', -7.245312);
      expect(response.body).toHaveProperty('longitude', 112.758554);
      expect(response.body).toHaveProperty('videoUrl');
      expect(response.body).toHaveProperty(
        'benefits',
        'Profit per periode penjualan akan diberikan sebagai dividend kepada investor'
      );
      expect(response.body).toHaveProperty('price', 300000);
      expect(response.body).toHaveProperty('FarmerId');
    }, 30000);
    

    it('should response 500 when internal server error', async () => {
      const response = await request(app)
        .post('/farms/my-farms/farm')
        .send('name', 'Lestari Ayam')
        .set('access_token', access_token_farmer);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'message',
        'No files were uploaded.'
      );
    }, 30000);

    it('should response 400 when name is empty', async () => {
      const response = await request(app)
        .post('/farms/my-farms/farm')
        .field('category', 'Chicken')
        .field('city', 'Surabaya')
        .field('address', 'Jalan Timur 1')
        .field('latitude', -7.245312)
        .field('longitude', 112.758554)
        .field('videoUrl', 'https://www.youtube.com/watch?v=T9PFzLBVZvg')
        .field(
          'benefits',
          'Profit per periode penjualan akan diberikan sebagai dividend kepada investor'
        )
        .field('sharePercent', 50)
        .field('price', 300000)
        .attach('photoUrl', 'uploadimage/01.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/02.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/03.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/04.jpg')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Name Required'
      );
    }, 30000);

    it('should response 400 when category is null', async () => {
      const response = await request(app)
        .post('/farms/my-farms/farm')
        .field('name', 'Lestari Ayam')
        .field('city', 'Surabaya')
        .field('address', 'Jalan Timur 1')
        .field('latitude', -7.245312)
        .field('longitude', 112.758554)
        .field('videoUrl', 'https://www.youtube.com/watch?v=T9PFzLBVZvg')
        .field(
          'benefits',
          'Profit per periode penjualan akan diberikan sebagai dividend kepada investor'
        )
        .field('sharePercent', 50)
        .field('price', 300000)
        .attach('photoUrl', 'uploadimage/01.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/02.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/03.jpeg')
        .attach('additionalImages', 'uploadimage/addtionalImage/04.jpg')
        .set('access_token', access_token_farmer);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Category Required'
      );
    }, 30000);
   
    it('should response 200 when success', async () => {
      const response = await request(app)
        .post('/farms/my-farms/farm')

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        'message',
        'Invalid token'
      );
    }, 30000);
  });
});
