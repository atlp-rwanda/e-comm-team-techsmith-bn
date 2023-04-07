'use strict';
const { order1,order2,order3 } =require('./20230331090218-demo-Order.js')
const { user1,user2,user3 } =require('./20230330160128-demo-user.js')
const payment1 = {
  id:432,
  orderId: order1.id,
  userId: user1.id,
  receiptUrl: 'ch_1J9Z2pKZ2Z2Z2Z2Z2Z2Z2Z2Z2',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const payment2= {
  id:434,
  orderId: order2.id,
  userId: user2.id,
  receiptUrl: 'ch_1J9Z2pKZ2Z2Z2Z2Z2Z2Z2Z2Z2',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const payment3 = {
  id:435,
  orderId:order3.id ,
  userId: user3.id,
  receiptUrl: 'ch_1J9Z2pKZ2Z2Z2Z2Z2Z2Z2Z2Z2',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {

  await queryInterface.bulkInsert( 'payment', [payment1,payment2,payment3],{});
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('payment', null, {}),
  payment1,
  payment2,
  payment3
};
