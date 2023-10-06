const { Invest, Investor, Farm, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

class InvestController {
  static async getInvest(req, res, next) {
    try {
      const invest = await Invest.findAll({
        where: { investorId: req.investor.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Farm,
            attributes: ["name"],
          },
        ],
      });

      res.status(200).json(invest);
    } catch (error) {
      next(error);
    }
  }

  static async getInvestById(req, res, next) {
    try {
      const investDetail = await Invest.findByPk(req.params.id);
      if (!investDetail) {
        throw { name: "invest_not_found", id: req.params.id };
      }

      res.status(200).json(investDetail);
    } catch (error) {
      next(error);
    }
  }

  static async postInvest(req, res, next) {
    try {
      let { ownership, totalPrice, farmId } = req.body;

      const { balance } = await Investor.findByPk(req.params.id);

      if (balance >= req.body.totalPrice) {
        const data = await Invest.create({
          status: "success",
          ownership,
          totalPrice,
          farmId,
          investorId: req.investor.id,
        });
        res.status(201).json(data);
      } else {
        throw {
          name: "failed",
          status: "failed",
          ownership,
          totalPrice,
          farmId,
          investorId: req.investor.id,
        };
      }
    } catch (error) {
      if (error.name === "failed") {
        const data = {
          status: "failed",
          ownership: error.ownership,
          totalPrice: error.totalPrice,
          farmId: error.farmId,
          investorId: req.investor.id,
        };
        await Invest.create(data);
        return res.status(400).json(data);
      } else {
        next(error);
      }
    }
  }

  static async getInvestByFarmId(req, res, next) {
    try {
      const { farmId } = req.params;

      const sql = `
      SELECT "Invests"."investorId", "Investors".username, "Investors".email, "Investors"."phoneNumber", SUM(ownership) AS "totalOwnership" FROM "Invests"
        JOIN "Investors"  ON "Investors".id = "Invests"."investorId"
        WHERE "farmId" = ${farmId} AND "status" = 'success'
        GROUP BY "Invests"."investorId", "Investors".id
      `;

      const invests = await sequelize.query(sql, { type: QueryTypes.SELECT });
      res.status(200).json(invests);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = InvestController;
