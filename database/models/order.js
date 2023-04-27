'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
   
    static associate(models) {
      // define association here
      order.belongsTo(models.user,{
        foreignKey:'userId',
        as:'user',
        onDelete:'CASCADE'
      })
      order.hasOne(models.payment,{
        onDelete:'CASCADE'
      })
      order.belongsTo(models.product,{
          foreignKey: 'productId',
          as:'product',
          onDelete:'CASCADE'
        })
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
      type: DataTypes.INTEGER,
      validate: {
        min:1,
      }
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