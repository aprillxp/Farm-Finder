const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");

let access_token_investor = "";

beforeAll(async () => {
  let farm = require("../data/farm.json");
  let invest = require("../data/invest.json");
  await sequelize.queryInterface.bulkInsert("Farmers", [
    {
      username: "Waryo",
      email: "waryo@mail.com",
      password: hash("waryo"),
      phoneNumber: "0813234344",
      status: "Active",
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "Tarmudi",
      email: "tarmudi@mail.com",
      password: hash("tarmudi"),
      phoneNumber: "0817934344",
      status: "Active",
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "Jono",
      email: "jono@mail.com",
      password: hash("jono"),
      phoneNumber: "08170974344",
      status: "Active",
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await sequelize.queryInterface.bulkInsert("Investors", [
    {
      username: "John Doe",
      email: "invest@mail.com",
      password: hash("testing"),
      phoneNumber: "07142421424",
      balance: 100000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  farm = farm.map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Farms", farm);

  invest = invest.map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Invests", invest);

  const responseInvestors = await request(app)
    .post("/users/investors/login")
    .send({
      email: "invest@mail.com",
      password: "testing",
    });

  access_token_investor = responseInvestors.body.access_token;
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Invests", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Farms", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Investors", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Farmers", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /invests", () => {
  it("responds with status 200 when success get invests", async () => {
    const response = await request(app)
      .get("/invests")
      .set("access_token", access_token_investor);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("Farm");
    expect(response.body[0].Farm).toHaveProperty("name");
  });

  it('should response with status 401 when invalid token', async () => {
    const response = await request(app)
      .post('/invests')
      .set('access_token', access_token_investor + '1');
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });
});

describe("POST /invests", () => {
  it("responds with status 201 when success post invests", async () => {
    const response = await request(app)
      .post("/invests/1")
      .send({
        status: "success",
        ownership: 1,
        totalPrice: 100,
        farmId: 1,
        investorId: 1,
      })
      .set("access_token", access_token_investor);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("ownership");
    expect(response.body).toHaveProperty("totalPrice");
    expect(response.body).toHaveProperty("farmId");
    expect(response.body).toHaveProperty("investorId");
  });

  it('responds with status 400 when ownership is required/null', async () => {
    const response = await request(app)
      .post('/invests/1')
      .send({
        status: "success",
        ownership: null,
        totalPrice: 100,
        farmId: 1,
        investorId: 1,
      })
      .set('access_token', access_token_investor);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Ownership cannot be empty');
  });

  it('responds with status 400 when totalPrice is required/null', async () => {
    const response = await request(app)
      .post('/invests/1')
      .send({
        status: "success",
        ownership: 1,
        totalPrice: null,
        farmId: 1,
        investorId: 1,
      })
      .set('access_token', access_token_investor);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'TotalPrice cannot be empty');
  });

  it('responds with status 400 when invest is failed', async () => {
    const response = await request(app)
    .post('/invests/1')
    .send({
      status: "success",
      ownership: 1,
      totalPrice: 10000002,
      farmId: 1,
      investorId: 1,
    })
    .set('access_token', access_token_investor);
      console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("ownership");
    expect(response.body).toHaveProperty("farmId");
    expect(response.body).toHaveProperty("investorId");
  });

  it('responds with status 400 when farmId is required/null', async () => {
    const response = await request(app)
      .post('/invests/1')
      .send({
        status: "success",
        ownership: 1,
        totalPrice: 100,
        farmId: null,
        investorId: 1,
      })
      .set('access_token', access_token_investor);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'farmId cannot be empty');
  });

  it('should response with status 401 when invalid token', async () => {
    const response = await request(app)
      .post('/invests')
      .set('access_token', access_token_investor + '1');
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });
});

describe("GET /invests/:id", () => {
  it("responds with status 200 when success get invests by id", async () => {
    const response = await request(app)
      .get("/invests/1")
      .set("access_token", access_token_investor);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("ownership");
    expect(response.body).toHaveProperty("totalPrice");
    expect(response.body).toHaveProperty("farmId");
    expect(response.body).toHaveProperty("investorId");
  });

  it("responds with status 404 when id not found", async () => {
    const response = await request(app)
      .get("/invests/99")
      .set("access_token", access_token_investor);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'report with id 99 not found');
  });

  it('should response with status 401 when invalid token', async () => {
    const response = await request(app)
      .post('/invests')
      .set('access_token', access_token_investor + '1');
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });
});

describe("GET /invests/farms/:farmId", () => {
  it("responds with status 200 when success get invests by farm id", async () => {
    const response = await request(app)
      .get("/invests/farms/1")
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("investorId");
    expect(response.body[0]).toHaveProperty("username");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.body[0]).toHaveProperty("totalOwnership");
  });
});
