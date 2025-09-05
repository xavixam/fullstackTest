'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vehicles', [
      { name: 'Seat Ibiza', vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ford Focus', vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'BMW 3 Series', vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
