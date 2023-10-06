'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      Image.belongsTo(models.Farm, {foreignKey: 'FarmId'})
    }
  }
  Image.init({
    FarmId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};