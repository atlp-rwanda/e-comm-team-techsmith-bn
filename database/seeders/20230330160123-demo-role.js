'use strict';

const role1 = {
  id: 10,
  name: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
};

const role2 = {
  id: 20,
  name: 'buyer',
  createdAt: new Date(),
  updatedAt: new Date()
};

const role3 = {
  id: 30,
  name: 'seller',
  createdAt: new Date(),
  updatedAt: new Date()
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */

    await queryInterface.bulkInsert('role', [role1, role2, role3], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
  },
  role1,
  role2,
  role3
};