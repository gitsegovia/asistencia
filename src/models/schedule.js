'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.hasMany(models.Employee, {
        foreignKey: {
          name: 'scheduleId',
          field: 'scheduleId'
        },
        as: 'employees',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Schedule.belongsTo(models.Status, {
        foreignKey: {
          name: 'statusId',
          field: 'statusId'
        },
        as: 'status',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };

  Schedule.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    entryTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    departureTime: {
      type: DataTypes.TIME,
      allowNull: true
    },

    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};