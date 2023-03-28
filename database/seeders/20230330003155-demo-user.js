'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

  await queryInterface.bulkInsert(
   
    'Users',
    [
      {
        Name: 'renaike Nkurunziza',
        email: 'aike@gmail.com',
        Role:'Administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: 'Christine Ineza',
        email: 'chris@gmail.com',
        Role:'Designer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: 'Edison Nkurunziza',
        email: 'edi@gmail.com',
        Role:'Editor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),

};