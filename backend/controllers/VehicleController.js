const { Vehicle, VehicleType, Booking } = require('../models');

const VehicleController = {
    async create(req, res, next) {
        try {
            const { name, vehicleTypeId } = req.body;

            if (!name || !vehicleTypeId) {
                return res.status(400).send({ message: "name y vehicleTypeId son requeridos" });
            }

            const vehicle = await Vehicle.create({ name, vehicleTypeId });
            res.status(201).send({ message: "Vehicle created", vehicle });
        } catch (error) {
            console.error(error);
            next(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getAll(req, res, next) {
        try {
            const vehicles = await Vehicle.findAll({
                include: [
                    { model: VehicleType, attributes: ["id", "name"] },
                    { model: Booking, attributes: ["id", "startDate", "endDate"] }
                ]
            });
            res.status(200).send(vehicles);
        } catch (error) {
            console.error(error);
            next(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getById(req, res, next) {
        try {
            const vehicle = await Vehicle.findByPk(req.params.id, {
                include: [
                    { model: VehicleType, attributes: ["id", "name"] },
                    { model: Booking, attributes: ["id", "startDate", "endDate"] }
                ]
            });
            res.status(200).send(vehicle);
        } catch (error) {
            console.error(error);
            next(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
};

module.exports = VehicleController;