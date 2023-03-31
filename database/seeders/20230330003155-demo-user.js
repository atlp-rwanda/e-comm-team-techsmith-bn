'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

  await queryInterface.bulkInsert(
   
    'Users',
    [
      {
        name: 'parfaite ',
        email: 'parfaitetwagira@gmail.com',
        role:'Administrator',
        password:'parfaite',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Christine Ineza',
        email: 'chris@gmail.com',
        role:'Designer',
        password:'musanze',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Edison Nkurunziza',
        email: 'edi@gmail.com',
        role:'Editor',
        password:'kigali',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),

};