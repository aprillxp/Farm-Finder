const express = require("express");
const UserController = require("../controllers/usersController");
const { authFarmer } = require("../middlewares/auth");
const users = express.Router();

users
    .get("/investors", UserController.findInvestor)
    .post("/investors/register", UserController.createInvestor)
    .post("/investors/login", UserController.loginInvestor)
    .get("/investors/:id", UserController.findOneInvestor)
    .post("/farmers/register", UserController.createFarmer)
    .post("/farmers/login", UserController.loginFarmer)
    .get("/farmers/:id", UserController.findOneFarmer)
    .use(authFarmer)
    .patch("/farmers/:id", UserController.editStatusFarmer)

module.exports = users;
