'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('activity', 'roomId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.remov
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('activity', 'roomId');
  }
};
