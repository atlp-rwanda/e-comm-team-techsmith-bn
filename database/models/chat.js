'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    static associate(models) {
        chat.belongsTo(models.user, {
          foreignKey: 'userId',
          as: 'user',
          onDelete: 'CASCADE',
        });
      };
  }
  chat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      messageBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'chat',
    }
  );
  return chat;
};
