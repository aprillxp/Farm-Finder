"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Farmer extends Model {

    static associate(models) {
      // define association here
    }
  }
  Farmer.init(
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
      status: DataTypes.STRING,
      address: DataTypes.STRING,
      balance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Farmer",
      hooks: {
        beforeCreate(item) {
          item.status = "active";
          item.balance = 0;
          item.password = hash(item.password);
        },
      },
    }
  );
  return Farmer;
};
