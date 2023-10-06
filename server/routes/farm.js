const express = require("express");
const FarmController = require("../controllers/farmsController");
const authorizeDeleteFarm = require("../middlewares/authorization");
const { authFarmer } = require("../middlewares/auth");
const farm = express.Router();

farm

  .get("/", FarmController.getAllFarms)
  .get("/:farmId", FarmController.getFarmById)
  .use(authFarmer)
  .get("/my-farms/farms", FarmController.getAllMyFarm)
  .delete(
    "/my-farms/:farmId",
    authorizeDeleteFarm,
    FarmController.deleteByFarmId
  )
  .get("/my-farms/farm", FarmController.getAllUserFarms)
  .post("/my-farms/farm", FarmController.addFarm)
  .get("/my-farms/:farmId", FarmController.getUserFarmById)
  .patch("/:farmId", FarmController.updateFarmStatus);

module.exports = farm;
