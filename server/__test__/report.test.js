const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");

beforeAll(async () => {
  let farm = require("../data/farm.json");
  let report = require("../data/desc.json");
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

  report = report.map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Reports", report);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Reports", null, {
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
describe("Report Test", () => {
  describe("GET /reports", () => {
    it("responds with status 200 when success get reports", async () => {
      const response = await request(app).get("/reports");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
  });
});

describe("POST /reports", () => {
  it("responds with status 201 when success post reports", async () => {
    const response = await request(app).post("/reports").send({
      investorId: 1,
      farmId: 1,
      description:
        "Very good service, good land to invest here or build a business",
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "New description added");
  });

  it("responds with status 400 when Description is empty/null", async () => {
    const response = await request(app).post("/reports").send({
      investorId: 1,
      farmId: 1,
      description: null,
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Description cannot be empty");
  });

  it("responds with status 400 when InvestorId is empty/null", async () => {
    const response = await request(app).post("/reports").send({
      investorId: null,
      farmId: 1,
      description: "Very good service, good land to invest here or build a business",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "investorId cannot be empty");
  });

  it("responds with status 400 when FarmId is empty/null", async () => {
    const response = await request(app).post("/reports").send({
      investorId: 1,
      farmId: null,
      description: "Very good service, good land to invest here or build a business",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "farmId cannot be empty");
  });
});

describe("GET /reports/:id", () => {
  it("responds with status 200 when success get reports by id", async () => {
    const response = await request(app).get("/reports/1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("investorId");
    expect(response.body).toHaveProperty("farmId");
  });
  it("responds with status 404 when not found get reports by id", async () => {
    const response = await request(app).get("/reports/20");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", 'report with id 20 not found' );
  });
});
