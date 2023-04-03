'use strict';

const role1 = {
  id: 1,
  name: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
};

const role2 = {
  id: 2,
  name: 'buyer',
  createdAt: new Date(),
  updatedAt: new Date()
};

const role3 = {
  id: 3,
  name: 'seller',
  createdAt: new Date(),
  updatedAt: new Date()
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('People', [role1,role2,role3], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('People', null, {}); 
  },
  role1,
  role2,
  role3
};
