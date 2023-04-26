'use strict';
const { product1,product2,product3 } = require('./20230330215541-demo-product.js')
const { user1,user2,user3 }=require('./20230330160128-demo-user.js')

const order1={
  id: 1005,
  productId: product1.id,
  userId: user1.id,
  quantity: 12,
  status: 'Cancelled',
  get amount() {
    return this.quantity * product1.price
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
const order2 = {
  id: 1002,
  productId: product2.id,
  userId: user2.id,
  quantity: 10,
  status: 'Paid',
  get amount() {
    return this.quantity * product2.price
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
const order3 = {
  id: 1003,
  productId: product3.id,
  userId: user3.id,
  quantity:35,
  status: 'Pendng',
  get amount() {
    return this.quantity * product3.price
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
  module.exports = {
  up: async (queryInterface, Sequelize) => {

  await queryInterface.bulkInsert( 'order', [ order1,order2,order3 ], {},
  );
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('order', null, {}),
  order1, order2, order3
};