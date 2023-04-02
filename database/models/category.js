'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'category',
  });
  // category.associate= function(models){
  // category.hasMany(models.product,{
  //   foreignKey:"categoryId",
  //   as:"Product"  
  // });
  // }
  return category;
};