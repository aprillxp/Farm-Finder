const express = require("express");
const TransactionController = require("../controllers/transactionController");
const { authInvestor } = require("../middlewares/auth");

const transaction = express.Router();

transaction
    .use(authInvestor)
    .patch("/increments/:investorId", TransactionController.addTotaltransaction)
    .patch("/decrements/:investorId", TransactionController.minTotalTransaction)
    .post("/payments-token", TransactionController.midtransToken)
    
module.exports = transaction;
