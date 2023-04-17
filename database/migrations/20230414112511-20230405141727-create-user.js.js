'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('user', 'passcodeModifiedAt', {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('user', 'passcodeModifiedAt', {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        });
    }
}