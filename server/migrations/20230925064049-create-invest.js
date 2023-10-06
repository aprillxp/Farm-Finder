"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownership: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      farmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Farms",
          key: "id",
        },
      },
      investorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Investors",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Invests");
  },
};
