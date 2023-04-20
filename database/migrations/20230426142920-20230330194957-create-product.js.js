'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function(queryInterface, Sequelize) {
      // logic for transforming into the new state
      return queryInterface.addColumn(
          'product',
          'quantity', {
              type: Sequelize.INTEGER,
              allowNull: false,
              defaultValue: 1
          }

      );

  },

  down: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'product',
          'quantity'
      );
  }
}
