"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bussiness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bussiness.hasMany(models.Employee, {
        foreignKey: {
          name: "bussinessId",
          field: "bussinessId",
        },
        as: "employees",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Bussiness.hasMany(models.Assists, {
        foreignKey: {
          name: "bussinessId",
          field: "bussinessId",
        },
        as: "assists",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Bussiness.hasMany(models.Position, {
        foreignKey: {
          name: "bussinessId",
          field: "bussinessId",
        },
        as: "position",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Bussiness.hasMany(models.Schedule, {
        foreignKey: {
          name: "bussinessId",
          field: "bussinessId",
        },
        as: "schedule",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
  
    }
  }
  Bussiness.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      rif: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      direction: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Bussiness",
    }
  );
  return Bussiness;
};
