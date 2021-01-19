"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolePermit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        RolePermit.belongsTo(models.Role, {
          as: "role",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "roleId",
            field: "roleId",
            allowNull: true
          }
        }),
        RolePermit.belongsTo(models.Permit, {
            foreignKey: {
              name: "permitId",
              field: "permitId",
              allowNull: true
            },
            as: "permit",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            
        });
  
    }
  }
RolePermit.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: "RolePermit",
    }
  );
  return RolePermit;
};
