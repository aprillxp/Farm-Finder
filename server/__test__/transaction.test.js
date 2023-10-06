const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");
const { sign } = require("jsonwebtoken");

let access_token_investor = '';
let generateFakeToken = sign({id: "sjdgasdhsdyfwd"},process.env.SECRET_JWT)
let generateFakeToken2 = sign({id: "sjdgasdhsdyfwd"}, "jdsfuhdufdsuhfdug")

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
})

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
})

describe("Transaction Test", () => {
    describe("PATCH /transactions/decrements/:investorId", () => {
        it("should response with status 200 when success", async () => {
            const response = await request(app)
            .patch("/transactions/decrements/1")
            .send({balance: 100000})
            .set("access_token", access_token_investor)

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message','success sended balance');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('username');
            expect(response.body.data).toHaveProperty('balance');

        })
        it("should response with status 400 when balance is required", async () => {
            const response = await request(app)
            .patch("/transactions/decrements/1")
            .send({balance: ""})
            .set("access_token", access_token_investor)

            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'balance must be positif number');

        })
        it("should response with status 401 when invalid token", async () => {
            const response = await request(app)
            .patch("/transactions/decrements/1")
            .send({balance: ""})
            .set("access_token", access_token_investor+"1")

            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Invalid token');

        })
        it("should response with status 400 when not enough send balance investor", async () => {
            const response = await request(app)
            .patch("/transactions/decrements/1")
            .send({balance: 100000000})
            .set("access_token", access_token_investor)
            
            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'balance is not enough');

        })
        it("should response with status 400 when not enough balance investor", async () => {

            const response = await request(app)
            .patch("/transactions/decrements/1")
            .send({balance: "826"})
            .set("access_token", access_token_investor)

            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'balance is not enough');

        })
        it("should response with status 404 when not found investor", async () => {

            const response = await request(app)
            .patch("/transactions/decrements/34")
            .send({balance: "826"})
            .set("access_token", access_token_investor)

            expect(response.status).toBe(404)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'not found');

        })
    })
    describe("PATCH /transactions/increments/:investorId", () => {
      it("should response with status 200 when success", async () => {
        const response = await request(app)
        .patch("/transactions/increments/1")
        .send({balance: 100000})
        .set("access_token", access_token_investor)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message','success added balance');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('username');
        expect(response.body.data).toHaveProperty('balance');

      })
      it("should response with status 400 when balance is required", async () => {
        const response = await request(app)
        .patch("/transactions/increments/1")
        .send({balance: ""})
        .set("access_token", access_token_investor+"1")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message','Invalid token');

      })
      it("should response with status 401 when balance is required", async () => {
        const response = await request(app)
        .patch("/transactions/increments/1")
        .send({balance: ""})
        .set("access_token", access_token_investor+"1")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message','Invalid token');

      })
      it("should response with status 400 when balance is required", async () => {
        const response = await request(app)
        .patch("/transactions/increments/1")
        .send({balance: ""})
        .set("access_token", access_token_investor)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message','balance must be positif number');

      })
      it("should response with status 404 when investor id not found", async () => {
        const response = await request(app)
        .patch("/transactions/increments/100")
        .send({balance: "9349739453"})
        .set("access_token", access_token_investor)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message','not found');

      })
    })
  describe("POST /transactions/payments-token", () => {
    it("should response with status 201 when success", async ()=>{
      const response = await request(app).post("/transactions/payments-token").send({
        total: 100000,
        username: "test"
      })
      .set("access_token", access_token_investor)

      expect(response.status).toBe(201)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('redirect_url');

    })
    it("should response with status 400 when total is required", async ()=>{
      const response = await request(app).post("/transactions/payments-token").send({
        total: null,
        username: "test"
      })
      .set("access_token", access_token_investor)

      expect(response.status).toBe(400)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', 'total is required');

    })
    it("should response with status 400 when username is required", async ()=>{
      const response = await request(app).post("/transactions/payments-token").send({
        total: 12000,
        username: ""
      })
      .set("access_token", access_token_investor)

      expect(response.status).toBe(400)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', 'username is required');

    })
    it("should response with status 401 when token id not found", async ()=>{
      const response = await request(app).post("/transactions/payments-token").send({
        total: 12000,
        username: ""
      })
      .set("access_token", generateFakeToken)

      expect(response.status).toBe(404)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', "report with id undefined not found");

    })
    it("should response with status 401 when token key error", async ()=>{
      const response = await request(app).post("/transactions/payments-token").send({
        total: 12000,
        username: ""
      })
      .set("access_token", generateFakeToken2)

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', "Invalid token");

    })
    it("should response with status 401 when not send token", async ()=>{
      const response = await request(app).post("/transactions/payments-token").send({
        total: 12000,
        username: ""
      })
      
      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', "Invalid token");

    })
  })
})

