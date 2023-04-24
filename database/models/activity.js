'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity extends Model {

    static associate(models) {
      // define association here
      activity.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      })
    }
  }
  activity.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      defaultValue: 'Techsmiths'
    }
  }, {
    sequelize,
    modelName: 'activity',
    tableName: 'activity',
  });
  return activity;
};