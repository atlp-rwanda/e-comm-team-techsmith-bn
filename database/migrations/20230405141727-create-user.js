'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            roleId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            isActive: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            gender: {
                allowNull: false,
                type: Sequelize.STRING
            },
            birthDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            preferredLanguage: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'rw'
            },
            preferredCurrency: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'RWF'
            },
            physicalAddress: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'Rwanda'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            passcodeModifiedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            googleId: {
                type: Sequelize.STRING,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user', null, {});
    }
};