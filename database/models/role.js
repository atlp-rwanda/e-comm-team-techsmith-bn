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
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'role',
    tableName: 'role',
  });
  role.associate = function (models) {
    role.hasMany(models.user, {
      foreignKey: "roleId",
       as: "User",

    });
  };
  return role;
};