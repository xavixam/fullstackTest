'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const vehicles = await queryInterface.sequelize.query(
      `SELECT id FROM Vehicles;`
    );
    const vehicleIds = vehicles[0];

    if (!vehicleIds.length) return;

    // Example dates to not overlap
    const now = new Date();
    const bookings = [];

    vehicleIds.forEach((v, index) => {
      const startDate = new Date(now.getTime() + index * 24 * 60 * 60 * 1000); // Each bookings starts the day after
      const endDate = new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days duration

      bookings.push({
        firstName: `First${index + 1}`,
        lastName: `Last${index + 1}`,
        vehicleId: v.id,
        startDate,
        endDate,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await queryInterface.bulkInsert('Bookings', bookings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};