"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contact: {
        type: Sequelize.STRING,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      provinceId: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      contentHTML: {
        type: Sequelize.TEXT,
      },
      contentMarkdown: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Companies");
  },
};
