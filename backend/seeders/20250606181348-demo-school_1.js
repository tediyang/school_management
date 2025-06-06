'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Schools', [
      {
        id: Sequelize.literal('UUID()'),
        name: "Anglican Nursery and Primary School",
        address: "Off AP Filling Station, Masha, 98 Ibidun St, Surulere, Lagos",
        latitude: 80.56776,
        longitude: 135.36166,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Schools', null, {});
  },
};
