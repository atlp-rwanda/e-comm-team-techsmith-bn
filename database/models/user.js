"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email:{
    type: DataTypes.STRING,
    unique:true,
    allowNull:false
    },
    roleId: DataTypes.STRING,
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    password:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user',
  });
  // user.associate = function (models) {
  //   user.belongsTo(models.role, {
  //     foreignKey: "roleId",
  //     as: "Role",
  //   });
  //   user.belongsTo(models.order,{
  //     foreignKey: "userId",
  //     as: "Order",
  //   });
  //   user.belongsToMany(models.product,{
  //     through:"user_product"
  //   })
  //   user.hasOne(models.cart,{
  //     foreignKey: "userId",
  //     as: "Cart", 
  //   })
  // };

  return user;
};
