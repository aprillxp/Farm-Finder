"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invest extends Model {
    static associate(models) {
      Invest.belongsTo(models.Farm, { foreignKey: "farmId" });
      Invest.belongsTo(models.Investor, { foreignKey: "investorId" });
    }
  }
  Invest.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status cannot be empty",
          },
          notNull: {
            msg: "Status cannot be empty",
          },
        },
      },
      ownership: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Ownership cannot be empty",
          },
          notNull: {
            msg: "Ownership cannot be empty",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "TotalPrice cannot be empty",
          },
          notNull: {
            msg: "TotalPrice cannot be empty",
          },
        },
      },
      farmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "farmId cannot be empty",
          },
          notNull: {
            msg: "farmId cannot be empty",
          },
        },
      },
      investorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "investorId cannot be empty",
          },
          notNull: {
            msg: "investorId cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Invest",
    }
  );
  return Invest;
};
