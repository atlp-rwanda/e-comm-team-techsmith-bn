'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    static associate(models) {
      // define association here
      notification.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'notification',
      tableName: 'notification',
    }
  );
  return notification;
};
