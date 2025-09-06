'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    static associate(models) {
      VehicleType.hasMany(models.Vehicle, { foreignKey: 'vehicleTypeId' });
    }
  }

  VehicleType.init({
    name: DataTypes.STRING,
    wheels: DataTypes.INTEGER // 👈 añadimos aquí
  }, {
    sequelize,
    modelName: 'VehicleType',
    tableName: 'VehicleTypes'
  });

  return VehicleType;
};