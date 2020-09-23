'use strict';
const {
  Model
} = require('sequelize');
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
          name: 'bussinessId',
          field: 'bussinessId'
        },
        as: 'bussiness',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Employee.belongsTo(models.Position, {
        foreignKey:{
          name: 'positionId',
          field: 'positionId'
        },
        as: 'charges',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Employee.belongsTo(models.Schedule, {
         foreignKey:{
           neme: 'scheduleId',
           field: 'scheduleId'
         },
         as: 'shedule',
         onDelete: 'CASCADE',
         onUpdate: 'CASCADA'
      });
      Employee.belongsTo(models.Status, {
        foreignKey: {
          name: 'statusId',
          field: 'statusId'
        },
        as: 'status',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Employee.hasMany(models.Assists, {
        foreignKey: {
          name: 'employeeId',
          field: 'employeeId'
        },
        as: 'assists',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  Employee.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    identification: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firm: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
  
      sequelize,
      modelName: 'Employee',
    });
  return Employee;
};