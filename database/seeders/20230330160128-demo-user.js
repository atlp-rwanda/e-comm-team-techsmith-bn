'use strict';
const bcrypt = require('bcrypt');

const { admin, seller, buyer } = require('./20230330212636-demo-role.js');

const user1 = {
  id: 6000,
  name: 'Belyse sely',
  email: 'bel12@gmail.com',
  password: '$2b$10$UyFfWtkc5MNHbasmk9USGeR9us1g3YcrCZfC8hiH1RHYe8leOBDUi',
  roleId: admin.id,
  gender: 'Female',
  birthDate: new Date(),
  preferredLanguage: 'English',
  preferredCurrency: 'RWF',
  physicalAddress: 'Rwanda',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const user2 = {
  id: 6100,
  name: 'Joella tera',
  email: 'joa22@gmail.com',
  password: '$2b$10$UyFfWtkc5MNHbasmk9USGeR9us1g3YcrCZfC8hiH1RHYe8leOBDUi',
  roleId: seller.id,
  gender: 'Female',
  birthDate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'RWF',
  physicalAddress: 'Rwanda',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const user3 = {
  id: 6300,
  name: 'Nevie villen',
  email: 'ne12@gmail.com',
  password: '$2b$10$UyFfWtkc5MNHbasmk9USGeR9us1g3YcrCZfC8hiH1RHYe8leOBDUi',
  roleId: buyer.id,
  gender: 'Male',
  birthDate: new Date(),
  preferredLanguage: 'English',
  preferredCurrency: 'RWF',
  physicalAddress: 'Rwanda',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user4 = {
  id: 6334,
  name: 'Mugisha Ken',
  email: 'keneon2003@gmail.com',
  password: '$2b$10$UyFfWtkc5MNHbasmk9USGeR9us1g3YcrCZfC8hiH1RHYe8leOBDUi',
  roleId: buyer.id,
  gender: 'Male',
  birthDate: new Date(),
  preferredLanguage: 'English',
  preferredCurrency: 'RWF',
  physicalAddress: 'Rwanda',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user5 = {
  id: 6365,
  name: 'Gabby',
  email: 'Gabby2@gmail.com',
  password: '$2b$10$UyFfWtkc5MNHbasmk9USGeR9us1g3YcrCZfC8hiH1RHYe8leOBDUi',
  roleId: buyer.id,
  gender: 'Male',
  birthDate: new Date(),
  preferredLanguage: 'English',
  preferredCurrency: 'RWF',
  physicalAddress: 'Rwanda',
  createdAt: new Date(),
  updatedAt: new Date(),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('user', [user1, user2, user3, user4, user5], {});
  },
  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('user', null, {}),
  user1,
  user2,
  user3,
  user4,
  user5,
};
