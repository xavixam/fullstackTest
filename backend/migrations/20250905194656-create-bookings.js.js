'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      vehicleId: {
        type: Sequelize.INTEGER,
        references: { model: 'Vehicles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      startDate: { type: Sequelize.DATE, allowNull: false },
      endDate: { type: Sequelize.DATE, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};