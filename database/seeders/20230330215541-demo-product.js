'use strict';

const { category1,category2,category3 } = require('./20230330224039-demo-Category.js');
const { user1, user2, user3 } = require('./20230330160128-demo-user.js');


const product1 = {
  id:2001,
  name: 'JBL clip',
  condition:'new',
  price:6000,
  userId:user1.id,
  categoryId:category1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const product2 = {
  id:20101,
  name: 'polk BOOM',
  condition:'used',
  price:20000,
  userId:user2.id,
  categoryId:category2.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const product3 = {
  id:20201,
  name: 'Bose QuiteComfort',
  condition:'Refurbished',
  price:4000,
  userId:user3.id,
  categoryId:category3.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
/**
     * Add seed commands here.
    */
  await queryInterface.bulkInsert('product', [ product1,product2,product3 ], {},);
   
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('product', null, {}),
  product1,
  product2,
  product3
};
