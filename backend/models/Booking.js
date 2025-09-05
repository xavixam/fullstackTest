'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
    }
  }

  Booking.init({
    vehicleId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings'
  });

  return Booking;
};
