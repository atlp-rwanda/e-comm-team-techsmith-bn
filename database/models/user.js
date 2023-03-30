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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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

  return user;
};
