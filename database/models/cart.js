'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
   
    static associate(models) {
      // define association here
      cart.belongsTo(models.user,{
        foreignKey:'userId',
        as:'user',
        onDelete:'CASCADE'
      })
      cart.belongsTo(models.product,{
        foreignKey:'productId',
        as:'product',
        onDelete:'CASCADE'
      })
      
    }
  }
  cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'cart',
    tableName: 'cart',
  });
 
  return cart;
};
