"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permit.belongsToMany(models.Role, {
        through: "RolePermit",
        foreignKey: {
          name: "permitId",
          field: "permitId",
        },
        otherKey: {
          field: "roleId",
          name: "roleId",
        },
        as: "role",
      });
    }
  }
  Permit.init(
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
    },
    {
      sequelize,
      modelName: "Permit",
    }
  );
  return Permit;
};
