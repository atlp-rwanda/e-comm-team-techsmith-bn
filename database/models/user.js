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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unkwon'
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
    googleId:{
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user',
  });


  return user;
};
