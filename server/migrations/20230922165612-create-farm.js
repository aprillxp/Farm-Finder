'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: false 
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: false 
      },
      mainImgUrl: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      videoUrl: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      benefits: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      sharePercent: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false 
      },
      FarmerId: {
        type: Sequelize.INTEGER,
        allowNull: false ,
        references: {
          model: 'Farmers', 
          key: 'id' 
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Farms');
  }
};
