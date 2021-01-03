"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assists.belongsTo(models.Employee, {
        foreignKey: {
          name: "employeeId",
          field: "employeeId",
        },
        as: "Employees",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  Assists.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: null,
        defaultValue: DataTypes.UUIDV4,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Assists",
    }
  );
  return Assists;
};
