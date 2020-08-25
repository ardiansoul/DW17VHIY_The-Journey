"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Journey.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
      });
      Journey.hasMany(models.Bookmark, { foreignKey: "journeyId" });
    }
  }
  Journey.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Journey",
    }
  );
  return Journey;
};
