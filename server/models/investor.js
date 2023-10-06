"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Investor extends Model {

    static associate(models) {
      this.hasMany(models.Balance, {foreignKey: "userId"})
    }
  }
  Investor.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email format wrong",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone number is required",
          },
          notEmpty: {
            msg: "Phone number is required",
          },
        },
      },
      balance: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: "Investor",
      hooks: {
        beforeCreate(item) {
          item.balance = 0;
          item.password = hash(item.password);
        },
      },
    }
  );
  return Investor;
};
