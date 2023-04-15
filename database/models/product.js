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
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        price: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        condition: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiryDate: {
            allowNull: true,
            type: DataTypes.DATE
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'product',
        tableName: 'product',
    });
    return product;
};