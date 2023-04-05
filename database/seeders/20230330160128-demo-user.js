'use strict';
const bcrypt = require('bcrypt');
const { role1, role2, role3 } = require('./20230330160123-demo-role.js');

const user1 = {
  id: 6000,
  name: 'Belyse sely',
  email: 'bel12@gmail.com',
  password: '$2b$10$UyFfWtkc5MNHbasmk9USGeR9us1g3YcrCZfC8hiH1RHYe8leOBDUi',
  roleId: role1.id,
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
  roleId: role2.id,
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
  roleId: role3.id,
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
    await queryInterface.bulkInsert('user', [user1, user2, user3], {});
  },
  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('user', null, {}),
  user1,
  user2,
  user3,
};
