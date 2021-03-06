"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Bussiness, {
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
  Schedule.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entryTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      departureTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      hasExtraHours: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      coment: {
        type: DataTypes.TEXT,
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
      modelName: "Schedule",
    }
  );
  return Schedule;
};
