"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
    }
  }
  Company.init(
    {
      contact: DataTypes.STRING,
      address: DataTypes.STRING,
      companyName: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      image: DataTypes.TEXT,
      contentHTML: DataTypes.TEXT,
      contentMarkdown: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
