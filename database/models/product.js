'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    condition: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'product',
    tableName: 'product',
  });
  // product.associate = function (models) {
  //   product.belongsToMany(models.user,{
  //     through:"user_product"
  //   })
  //   product.belongsTo(models.category,{
  //     foreignKey: "categoryId",
  //     as: "Category",
  //   })
  //   product.belongsToMany(models.order,{
  //     through: "order_product"
       
      
  //   })
  // };
  return product;
};