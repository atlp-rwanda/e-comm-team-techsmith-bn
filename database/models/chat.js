'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    static associate(models) {
        chat.belongsTo(models.user, {
          foreignKey: 'userId',
          as: 'sender',
          onDelete: 'CASCADE',
        });
        chat.belongsTo(models.room, {
          foreignKey: 'roomId',
          as: 'room',
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
        allowNull: true,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'chat',
      tableName: 'chat',
    }
  );
  return chat;
};
