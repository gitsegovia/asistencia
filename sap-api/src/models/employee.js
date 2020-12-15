"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Bussiness, {
        foreignKey: {
          name: "bussinessId",
          field: "bussinessId",
        },
        as: "bussiness",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Employee.belongsTo(models.Position, {
        foreignKey: {
          name: "positionId",
          field: "positionId",
        },
        as: "charges",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
 
      Employee.hasMany(models.Assists, {
        foreignKey: {
          name: "employeeId",
          field: "employeeId",
        },
        as: "assists",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Employee.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identification: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firm: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  /* --------------------------------------------
    STATUS: [Active, Inactive, Suspended]
  --------------------------------------------- */
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Active"
      }
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
