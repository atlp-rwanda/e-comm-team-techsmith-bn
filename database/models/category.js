'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
   
    static associate(models) {
      // define association here
      category.belongsToMany(models.product,{
        through: 'productCategory'
      })
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
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'category',
  });

  return category;
};