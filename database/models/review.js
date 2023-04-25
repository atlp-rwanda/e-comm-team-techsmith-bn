'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
  
    static associate(models) {
      // define association here
      review.belongsTo(models.product,{
        foreignKey:'productId',
        as:'product',
        onDelete:'CASCADE'
      })
      review.belongsTo(models.user,{
        foreignKey:'userId',
        as:'user',
        onDelete:'CASCADE'
      })
    }
  }
  review.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    feedback: {
      allowNull: false,
      type: DataTypes.STRING,
    },


  }, {
    sequelize,
    modelName: 'review',
    tableName:'review',
  });
  return review;
};