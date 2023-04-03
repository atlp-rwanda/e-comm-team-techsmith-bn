'use strict';
const bcrypt = require('bcrypt')
const {admin,seller,buyer} = require('./20230330212636-demo-role.js')
 
const user1 = {
  id:6000,
  name: 'Belyse sely',
  email: 'bel12@gmail.com',
  password:bcrypt.hashSync('pa@23', 10),
  roleId:admin.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const user2 = {
  id:6100,
  name: 'Joella tera',
  email: 'joa22@gmail.com',
  password:bcrypt.hashSync('1@23', 10),
  roleId:seller.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const user3 = {
  id:6300,
  name: 'Nevie villen',
  email: 'ne12@gmail.com',
  password:bcrypt.hashSync('pa@2356', 10),
  roleId:buyer.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
     /**
     * Add seed commands here.
    */
  await queryInterface.bulkInsert('user',[user1,user2,user3],{});

  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('user', null,{}),
  user1,
  user2,
  user3

};