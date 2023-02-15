"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Company, {
        foreignKey: "companyId",
        as: "companyData",
      });
      Job.belongsTo(models.Allcode, {
        foreignKey: "jobType",
        targetKey: "keyMap",
        as: "jobTypeData",
      });
      Job.belongsTo(models.Allcode, {
        foreignKey: "jobGroup",
        targetKey: "keyMap",
        as: "jobGroupData",
      });
    }
  }
  Job.init(
    {
      jobName: DataTypes.STRING,
      status: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
      contentHTML: DataTypes.STRING,
      contentMarkdown: DataTypes.STRING,
      datePost: DataTypes.STRING,
      image: DataTypes.TEXT,
      dateExpiration: DataTypes.STRING,
      jobType: DataTypes.STRING,
      jobGroup: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
