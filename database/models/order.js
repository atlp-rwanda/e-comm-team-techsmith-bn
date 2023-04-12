'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status:{
      allowNull: false,
      type: DataTypes.STRING
    },
    quantity:{
      allowNull: false,
      type: DataTypes.INTEGER
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'order',
    tableName: 'order',
  });
 
  return order;
};