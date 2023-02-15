"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("applies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobId: {
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.INTEGER,
      },
      companyId: {
        type: Sequelize.INTEGER,
      },
      file: {
        type: Sequelize.BLOB("long"),
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("applies");
  },
};
