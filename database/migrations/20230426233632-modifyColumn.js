'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('order', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('order', 'quantity', {
      type: Sequelize.INTEGER,
      validation: {
        min: -1,
        max: 1000
      }
    })
  }
};
