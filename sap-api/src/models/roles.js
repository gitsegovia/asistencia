"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: {
          name: "roleId",
          field: "roleId",
        },
        as: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Role.belongsToMany(models.Permit, { 
        foreignKey: {
          name: "roleId",
          field: "roleId"
        },
        otherKey: {
          name: "permitId",
          field: "permitId"
        },
        through: 'RolePermit', as: "permits" });
    }
  }
  Role.init(
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
      modelName: "Role",
    }
  );
  return Role;
};
