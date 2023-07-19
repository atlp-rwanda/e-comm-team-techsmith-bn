'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     room.hasMany(models.participant, {
        as: 'participants',
        onDelete: 'CASCADE',
     })
     room.hasMany(models.chat, {
      foreignKey: 'roomId',
      as: 'chat',
      onDelete: 'CASCADE',
     })
    }
  }
  room.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room',
    tableName: 'room',
  });
  return room;
};