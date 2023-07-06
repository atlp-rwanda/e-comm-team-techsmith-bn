'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      user.hasOne(models.cart, {
        onDelete: 'CASCADE',
      });
      user.hasOne(models.wishlist, {
        onDelete: 'CASCADE',
      });
      user.hasMany(models.order, {
        onDelete: 'CASCADE',
      });
      user.hasMany(models.product, {
        onDelete: 'CASCADE',
        as: 'products',
      });
      user.belongsTo(models.role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
      });
      user.hasMany(models.chat, {
        onDelete: 'CASCADE',
        foreignKey: 'userId'
      });
      user.hasMany(models.review,{
        onDelete:'CASCADE'
      });
      user.hasMany(models.notification, {
        onDelete: 'CASCADE',
      });
      user.hasMany(models.participant, {
        onDelete: 'CASCADE',
        foreignKey: 'userId'
      });
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unspecified',
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      passcodeModifiedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      preferredLanguage: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      preferredCurrency: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'RWF',
      },
      physicalAddress: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'Kigali, Rwanda',
      },
      googleId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'user',
    }
  );

  return user;
};
