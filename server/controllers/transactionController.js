const { Balance, Investor } = require("../models");
const midtransClient = require("midtrans-client");
const { sequelize } = require("../models");

class TransactionController {
  static async addTotaltransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const balance = parseInt(req.body.balance);
      if (!balance) {
        return res
          .status(400)
          .json({ message: "balance must be positif number" });
      }
      const dataFind = await Investor.findByPk(req.params.investorId);
      if (!dataFind) {
        throw { name: "not_found" };
      } else {
        const data = await Investor.increment(
          { balance: balance },
          { where: { id: dataFind.id } },
          { transaction: t }
        );

        // if (!data[0]) {
        //   return res.status(200).json({ message: 'no data updated' });
        // } else {
        const dataUpdated = await Investor.findOne({
          where: { id: req.params.investorId },
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        });
        await Balance.create(
          {
            userId: req.params.investorId,
            balance: balance,
            status: "success",
          },
          { transaction: t }
        );

        await t.commit();
        return res
          .status(200)
          .json({ message: "success added balance", data: dataUpdated });
      }
      // }
    } catch (error) {
      const rollback = await t.rollback();
      console.log(rollback);
      const data = await Investor.findByPk(req.params.investorId);
      if (error.name !== "not_found") {
        await Balance.create({
          userId: req.params.investorId,
          balance: data.balance,
          status: "failed",
        });
      }
      next(error);
    }
  }
  static async minTotalTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const balance = parseInt(req.body.balance);
      if (!balance) {
        return res
          .status(400)
          .json({ message: "balance must be positif number" });
      }

      const dataFind = await Investor.findByPk(req.params.investorId);

      if (!dataFind) {
        throw { name: "not_found" };
      } else {
        if (dataFind.balance <= 0 || dataFind.balance < balance) {
          throw { name: "not_enough", balance };
        }
        await Investor.increment(
          { balance: -balance },
          { where: { id: dataFind.id } },
          { transaction: t }
        );

        const dataUpdated = await Investor.findOne(
          {
            where: { id: dataFind.id },
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          },
          { transaction: t }
        );
        await Balance.create(
          {
            userId: req.params.investorId,
            balance: balance,
            status: "minus",
          },
          { transaction: t }
        );
        await t.commit();
        return res
          .status(200)
          .json({ message: "success sended balance", data: dataUpdated });
      }
    } catch (error) {
      const rollback = await t.rollback();
      console.log(rollback);
      const dataFind = await Investor.findByPk(req.params.investorId);

      if (error.name === "not_enough") {
        await Balance.create({
          userId: req.params.investorId, //! note
          balance: error.balance,
          status: "failed",
        });
        return res.status(400).json({ message: "balance is not enough" });
      } else {
        next(error);
      }
    }
  }
  static async midtransToken(req, res, next) {
    try {
      const { total, username } = req.body;
      if (!total) {
        return res.status(400).json({ message: "total is required" });
      } else if (!username) {
        return res.status(400).json({ message: "username is required" });
      }
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let unique = new Date();
      unique = unique.getTime();
      let parameter = {
        transaction_details: {
          order_id: `Transaction-${unique}`,
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username,
        },
      };
      const midransToken = await snap.createTransaction(parameter);
      res.status(201).json(midransToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
