'use strict';
const admin = {
  id: 70001,
  name: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
};

const seller = {
  id: 71001,
  name: 'seller',
  createdAt: new Date(),
  updatedAt: new Date()
};

const buyer = {
  id: 72001,
  name: 'buyer',
  createdAt: new Date(),
  updatedAt: new Date()
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     /**
     * Add seed commands here.
    */
     await queryInterface.bulkInsert('role',[ admin,seller,buyer ],{});
  },

  down:  async(queryInterface, Sequelize)  => queryInterface.bulkDelete('role', null, 
  {}),
  admin,
  seller,
  buyer
};
