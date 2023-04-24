'use strict';

const chat1 = {
  id: 389,
  userId: 6000,
  messageBody: 'Hello',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const chat2 = {
  id: 2902,
  userId: 23,
  messageBody: 'Hi',
  createdAt: new Date(),
  updatedAt: new Date(),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('chats', [chat1, chat2], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chats', null, {});
  },
  chat1,
  chat2,
};
