'use strict';

const { role1, role2, role3 } = require('./20230330160123-demo-role.js');

const user1 = {
  name: 'John Doe',
  email: 'atlp@gmail.com',
  password: '123456',
  roleId: role1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user2 = {
  name: 'Jane Doe',
  email: 'aplt@gmail.com',
  password: '123456',
  roleId: role2.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user3 = {
  name: 'John Doe',
  email: 'nishimwe@gmail.com',
  password: '123456',
  roleId: role3.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */

    await queryInterface.bulkInsert('user', [user1, user2, user3], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */

    await queryInterface.bulkDelete('user', null, {});
  }
};
