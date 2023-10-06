const express = require("express");
const users = require("./users");
const farm = require("./farm");
const invest = require("./invests");
const balance = require("./balance");
const report = require("./reports");
const router = express.Router();
const transaction = require('../routes/transaction')
router
    .use("/users", users)
    .use("/balances", balance)
    .use("/farms", farm)
    .use("/reports", report)
    .use("/invests", invest)
    .use("/transactions", transaction)


module.exports = router;
