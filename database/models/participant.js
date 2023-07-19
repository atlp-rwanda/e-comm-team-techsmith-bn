'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      participant.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      })
      participant.belongsTo(models.room, {
        foreignKey: 'roomId',
        as: 'room',
        onDelete: 'CASCADE',
      })
    }
  }
  participant.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'participant',
    tableName: 'participant',
  });
  return participant;
};