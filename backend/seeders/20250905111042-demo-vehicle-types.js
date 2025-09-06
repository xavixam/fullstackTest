'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleTypes', null, {});

    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', wheels: "4", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Suv', wheels: "4", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', wheels: "4", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sports Bike', wheels: "2", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};
