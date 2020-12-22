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
      User.belongsTo(models.Role, {
        foreignKey: {
          name: "roleId",
          field: "roleId",
        },
        as: "roles",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.belongsTo(models.Bussiness, {
        foreignKey: {
          name: "bussinessId",
          field: "bussinessId",
        },
        as: "bussiness",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  /* --------------------------------------------
      STATUS: [Active, Inactive, Suspended]
    --------------------------------------------- */
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
      surName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Active",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
