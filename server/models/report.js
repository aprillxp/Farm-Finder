"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.Farm, { foreignKey: "farmId" });
      Report.belongsTo(models.Investor, { foreignKey: "investorId" });
    }
  }
  Report.init(
    {
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description cannot be empty",
          },
          notNull: {
            msg: "Description cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Report",
    }
  );
  return Report;
};
