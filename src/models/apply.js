"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class applyCV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  applyCV.init(
    {
      jobId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      provinceId: DataTypes.INTEGER,
      file: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "apply",
    }
  );
  return applyCV;
};
