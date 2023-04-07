'use strict';
const { user1,user2,user3 } = require('./20230330160128-demo-user.js')

const category1 = {
  id: 30001,
 name:'headphones',
  userId:user1.id,
  quantity:5,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const category2 = {
  id: 30101,
  name:'bluetooth speakers',
  userId:user2.id,
  quantity:20,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const category3 = { 
  id: 30201,
  name:'mouse',
  userId:user3.id,
  quantity:10,
  createdAt: new Date(),
  updatedAt: new Date(),
};
module.exports = {
  up: async (queryInterface, Sequelize) => {

  await queryInterface.bulkInsert(
   
    'category', [category1,category2,category3],{});
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('category', null, {}),
  category1,
  category2,
  category3
};
