const { verify } = require("../helpers/jwt");
const { Farmer, Investor } = require("../models");
exports.authInvestor = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw { name: "JsonWebTokenError" };
    } else {
      const payload = verify(req.headers.access_token);
      const investor = await Investor.findByPk(payload.id);
      // if (!investor) {
      //   throw { name: "JsonWebTokenError" };
      // } else {
        req.investor = investor;
        next();
      // }
    }
  } catch (error) {
    next(error);
  }
};

exports.authFarmer = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw { name: "JsonWebTokenError" };
    } else {
      const payload = verify(req.headers.access_token);
      const farmer = await Farmer.findByPk(payload.id);
      if (!farmer) {
        throw { name: "JsonWebTokenError" };
      } else {
        req.farmer = farmer;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
