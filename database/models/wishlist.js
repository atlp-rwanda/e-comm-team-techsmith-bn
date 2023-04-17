'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  wishlist.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    productId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'wishlist',
    tableName: 'wishlist',
  });
  return wishlist;
};