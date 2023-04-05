'use strict';

const subscription1 = {
  id: 1,
  name: 'John Doe',
  email: 'atlp@gmail.com',
  isSubscribed: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const subscription2 = {
  id: 2,
  name: 'Nishimwe Prince',
  email: 'princeelysee@gmail.com',
  isSubscribed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const subscription3 = {
  id: 3,
  name: 'Uwayo Danny',
  email: 'uwayodanny23@gmail.com',
  isSubscribed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscription', [subscription1, subscription2], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription', null, {});
  },
  subscription1,
  subscription2
};
