"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeeSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        EmployeeSchedule.belongsTo(models.Employee, {
          as: "employee",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "employeeId",
            field: "employeeId",
            allowNull: true
          }
        }),
        EmployeeSchedule.belongsTo(models.Schedule, {
            foreignKey: {
              name: "scheduleId",
              field: "scheduleId",
              allowNull: true
            },
            as: "schedules",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            
        });
  
    }
  }
EmployeeSchedule.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      dayOfWeek: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "EmployeeSchedule",
    }
  );
  return EmployeeSchedule;
};
