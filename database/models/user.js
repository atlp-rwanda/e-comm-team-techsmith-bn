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
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    }, 
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }, 
    roleId: DataTypes.STRING,
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    preferredLanguage: {
      allowNull: false,
      type: DataTypes.STRING
    },
    preferredCurrency: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'RWF'
    },
    physicalAddress: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'Kigali, Rwanda'
    },
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user',
  });


  return user;
};
