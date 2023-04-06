'use strict';


const user1 = {
  name: 'Emery Frank',
  email: 'frank@gmail.com',
  password: 'frankfrank',
  roleId: role1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user2 = {
  name: 'John Doe',
  email: 'john@gmail.com',
  password: 'johnjohn',
  roleId: role2.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user3 = {
  name: 'Justin ',
  email: 'justin@gmail.com',
  password: 'justinjustin',
  roleId: role3.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('User', [user1,user2,user3], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('People', null, {});
     
  },
  user1,
  user2,
  user3
};
