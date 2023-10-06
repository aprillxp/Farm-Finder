'use strict';

const { hash } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Farmers",[
      {
        username: "Waryo",
        email: "waryo@mail.com",
        password: hash("waryo"),
        phoneNumber: "0813234344",
        status: "Active",
        balance: 1000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Tarmudi",
        email: "tarmudi@mail.com",
        password: hash("tarmudi"),
        phoneNumber: "0817934344",
        status: "Active",
        balance: 1000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Jono",
        email: "jono@mail.com",
        password: hash("jono"),
        phoneNumber: "08170974344",
        status: "Active",
        balance: 1000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Farmers", null)
  }
};
