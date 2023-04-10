'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  payment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER, 
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    receiptUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'payment',
    tableName: 'payment',
  });
 
  return payment;
};