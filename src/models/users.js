"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  /*    User.belongsTo(models.Role, {
        foreignKey: {
          name: "roleId",
          field: "roleId",
        },
        as: "roles",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.belongsTo(models.Status, {
        foreignKey: {
          name: "statusId",
          field: "statusId",
        },
        as: "status",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
  */
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
