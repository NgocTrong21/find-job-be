"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobName: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      companyId: {
        type: Sequelize.INTEGER,
      },
      contentHTML: {
        type: Sequelize.TEXT,
      },
      contentMarkdown: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      datePost: {
        type: Sequelize.STRING,
      },
      dateExpiration: {
        type: Sequelize.STRING,
      },
      jobType: {
        type: Sequelize.STRING,
      },
      jobGroup: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Jobs");
  },
};
