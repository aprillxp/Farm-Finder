"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/desc.json").map((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("Reports", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reports", null);
  },
};
