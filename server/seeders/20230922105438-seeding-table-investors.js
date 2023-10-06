"use strict";

const { hash } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Investors",
      [
        {
          username: "John Doe",
          email: "invest@mail.com",
          password: hash("testing"),
          phoneNumber: "07142421424",
          balance: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Balances",
      [
        {
          balance: 100000,
          userId: 1,
          status: "success",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Investors", null, {});
  },
};
