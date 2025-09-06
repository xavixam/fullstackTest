'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
    
    await queryInterface.bulkInsert('Vehicles', [
      { name: 'Seat Ibiza', vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ford Fiesta', vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Volkswagen Golf', vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dacia Sandero', vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Skoda Kamiq', vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kia Stonic', vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mazda 3 Sedan', vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Toyota Corolla Sedan', vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Skoda Octavia', vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Adrenaline SL 10 SC45', vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Quercus', vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kenta SL LTD', vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
