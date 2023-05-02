'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('wishlist', 'productId', {
        type: Sequelize.INTEGER,
     
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn('wishlist', 'productId')]);
  }
};

