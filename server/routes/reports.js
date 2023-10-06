const express = require("express");
const ReportController = require("../controllers/reportController");
const report = express.Router();


report
    .get("/", ReportController.getReport)
    .post("/", ReportController.postReport)
    .get("/:id", ReportController.getReportById)


module.exports = report;
