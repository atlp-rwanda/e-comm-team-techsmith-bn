'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

  await queryInterface.bulkInsert(
   
    'Users',
    [
      {
        name: 'renaike Nkurunziza',
        email: 'aike@gmail.com',
        role:'Administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Christine Ineza',
        email: 'chris@gmail.com',
        role:'Designer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Edison Nkurunziza',
        email: 'edi@gmail.com',
        role:'Editor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),

};