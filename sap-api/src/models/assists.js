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
      entryTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      timeDiff: {
        type: DataTypes.DATE,
        allowNull: null,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: true, 
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: null,
      }
    },
    {
      sequelize,
      modelName: "Assists",
    }
  );
  return Assists;
};
