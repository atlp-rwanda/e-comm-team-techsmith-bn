'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('product', {
            id: {
                type: Sequelize.STRING(36),
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            categoryId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            condition: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            expiryDate: {
                allowNull: true,
                type: Sequelize.DATE
            },
            isAvailable: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('product');
    }
};