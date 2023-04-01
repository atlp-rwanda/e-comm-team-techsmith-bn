'use strict';
const { product1,product2,product3 }= require('./20230330215540-demo-Product.js')
const { user1,user2,user3 }= require('./20230330003155-demo-user.js')
const { category1,category2,category3 }= require('./20230330224039-demo-Category.js')

const cart1 = {
  id:2999, 
  productId: product1.id,
  userId: user1.id,
  categoryId:category1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const cart2 = {
  id:443443,
  productId: product2.id,
  userId: user2.id,
  categoryId:category2.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const cart3 = {
  id:23223,
  productId: product3.id,
  userId: user3.id,
  categoryId:category3.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {

  await queryInterface.bulkInsert( 'cart', [ cart1,cart2,cart3 ],{});
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('cart', null, {}),
};