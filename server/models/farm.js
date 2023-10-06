"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Farm extends Model {

    static associate(models) {
      Farm.hasMany(models.Image, { foreignKey: "FarmId" });
      Farm.belongsTo(models.Farmer,{foreignKey: "FarmerId"})
    }
  }
  Farm.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name Required" },
          notEmpty: { msg: "Name Required" },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Category Required" },
          notEmpty: { msg: "Category Required" },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "City Required" },
          notEmpty: { msg: "City Required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Address Required" },
          notEmpty: { msg: "Address Required" },
        },
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "Latitude Required" },
          notEmpty: { msg: "Latitude Required" },
        },
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "Longitude Required" },
          notEmpty: { msg: "Longitude Required" },
        },
      },
      mainImgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Main Image URL Required" },
          notEmpty: { msg: "Main Image URL Required" },
        },
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Video URL Required" },
          notEmpty: { msg: "Video URL Required" },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "unverified"
      },
      benefits: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Benefits of investing required" },
          notEmpty: { msg: "Benefits of investing required" },
        },
      },
      sharePercent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Share Percent Required" },
          notEmpty: { msg: "Share Percent Required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Price Required" },
          notEmpty: { msg: "Price Required" },
        },
      },
      FarmerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Farmer ID Required" },
          notEmpty: { msg: "Farmer ID Required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Farm",
    }
  );
  return Farm;
};
