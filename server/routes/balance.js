const express = require("express");
const BalanceController = require("../controllers/balanceController");
const { authInvestor } = require("../middlewares/auth");
const balance = express.Router();

balance
    .use(authInvestor)
    .get("/", BalanceController.findAllBalance)
    .post("/", BalanceController.createBalance)
    .get("/:balanceId", BalanceController.findBalance)
    .put("/status/:balanceId", BalanceController.updateStatusBalance) 
    .delete("/:balanceId", BalanceController.deleteBalance)

    
module.exports = balance;
