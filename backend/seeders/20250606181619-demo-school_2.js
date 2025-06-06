'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Schools', [
      {
        id: Sequelize.literal('UUID()'),
        name: "University of Texas, USA",
        address: "2515 Speedway, Austin, TX 78712, United States",
        latitude: 30.2672,
        longitude: 97.7431,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Schools', null, {});
  },
};
