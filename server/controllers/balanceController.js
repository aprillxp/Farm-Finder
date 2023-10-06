const { Balance, Investor } = require("../models");

class BalanceController {
  static async findAllBalance(req, res, next) {
    try {
      const data = await Balance.findAll({
        where: { userId: req.investor.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Investor,
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      // next(error);
    }
  }
  static async findBalance(req, res, next) {
    try {
      const data = await Balance.findOne({
        where: { id: req.params.balanceId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Investor,
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      });
      if (!data) {
        throw { name: "not_found" };
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }
  static async createBalance(req, res, next) {
    try {
      if (!req.body.balance) {
        return res.status(400).json({ message: "balance is required" });
      }
      const { id, userId, balance, status } = await Balance.create({
        ...req.body,
        status: "pending",
      });
      res.status(201).json({ id, userId, balance, status });
    } catch (error) {
      next(error);
    }
  }
  static async updateStatusBalance(req, res, next) {
    try {
      if (!req.body.status) {
        return res.status(400).json({ message: "status is required" });
      }
      const dataFind = await Balance.findByPk(req.params.balanceId);
      if (!dataFind) {
        throw { name: "not_found" };
      } else {
        const data = await Balance.update(
          { status: req.body.status },
          { where: { id: dataFind.id } }
        );
        // if (!data[0]) {
        //   return res.status(200).json({ message: 'no data updated' });
        // } else {
        const dataUpdated = await Balance.findOne({
          where: { id: req.params.balanceId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return res.status(200).json(dataUpdated);
        // }
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteBalance(req, res, next) {
    try {
      const dataFind = await Balance.findOne({
        where: { id: req.params.balanceId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!dataFind) {
        throw { name: "not_found" };
      } else {
        const data = await Balance.destroy({ where: { id: dataFind.id } });
        // if (!data) {
        // return res.status(200).json({ message: 'deleting failed' });
        // } else {
        return res.status(200).json({
          message: "deleted balance success",
          data: dataFind,
        });
        // }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BalanceController;
