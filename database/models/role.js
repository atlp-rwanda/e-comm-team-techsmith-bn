'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
      // define association here
    }
  }
  role.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
    tableName: 'role',
  });
 
  return role;
};