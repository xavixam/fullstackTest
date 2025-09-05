const { VehicleType, Vehicle } = require('../models');

const VehicleTypeController = {

  async create(req, res, next) {
    try {
      const vehicleType = await VehicleType.create(req.body);
      res.status(201).send({ message: "Vehicle type created", vehicleType });
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },

  async getAll(req, res, next) {
    try {
      const vehicleTypes = await VehicleType.findAll({
        include: {
          model: Vehicle,
          attributes: ["id", "name"]
        }
      });
      res.status(200).send(vehicleTypes);
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },

  async getById(req, res, next) {
    try {
      const vehicleType = await VehicleType.findByPk(req.params.id, { include: Vehicle });
      res.status(200).send(vehicleType);
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).send({ message: "ERROR", error });
    }
  }
};

module.exports = VehicleTypeController;
