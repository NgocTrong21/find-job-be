"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.Company, {
        foreignKey: "provinceId",
        sourceKey: "keyMap",
        as: "provinceData",
      });
      Allcode.hasMany(models.Job, {
        foreignKey: "jobType",
        as: "jobTypeData",
      });
      Allcode.hasMany(models.Job, {
        foreignKey: "jobGroup",
        as: "jobGroupData",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
