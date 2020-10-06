"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
/*      Position.hasMany(models.Employee, {
        foreignKey: {
          name: "positionId",
          field: "positionId",
        },
        as: "employees",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
*/
   }
  }
  Position.init(
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
      modelName: "Position",
    }
  );
  return Position;
};
