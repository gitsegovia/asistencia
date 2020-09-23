'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.hasMany(models.User, {
        foreignKey: {
          name: 'statusId',
          field: 'statusId'
        },
        as: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Status.hasMany(models.Employee, {
        foreignKey: {
          name: 'statusId',
          field: 'statusId'
        },
        as: 'employees',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Status.hasMany(models.Shedule, {
        foreignKey: {
          name: 'statusId',
          field: 'statusId'
        },
        as: 'schedule',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  Status.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },

    sequelize,
    modelName: 'Status',
  });
  return Status;
};