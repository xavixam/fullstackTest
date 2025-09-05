const { Booking, Vehicle } = require('../models');
const { Op } = require('sequelize');

const BookingController = {

  async create(req, res, next) {
    try {
      const { vehicleId, startDate, endDate } = req.body;

      if (!vehicleId || !startDate || !endDate) {
        return res.status(400).json({ error: 'vehicleId, startDate y endDate son requeridos' });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        return res.status(400).json({ error: 'startDate debe ser antes de endDate' });
      }

      const overlapping = await Booking.findOne({
        where: {
          vehicleId,
          startDate: { [Op.lt]: end },
          endDate: { [Op.gt]: start }
        }
      });

      if (overlapping) {
        return res.status(400).json({ error: 'El vehículo ya está reservado en esas fechas' });
      }

      const booking = await Booking.create({ vehicleId, startDate: start, endDate: end });
      res.status(201).json(booking);

    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).json({ message: "There was a problem", error });
    }
  },

  async getAll(req, res, next) {
    try {
      const bookings = await Booking.findAll({
        include: { model: Vehicle, attributes: ["id", "name"] }
      });
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).json({ message: "There was a problem", error });
    }
  },

  async getById(req, res, next) {
    try {
      const booking = await Booking.findByPk(req.params.id, {
        include: { model: Vehicle, attributes: ["id", "name"] }
      });
      res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).json({ message: "There was a problem", error });
    }
  },
};

module.exports = BookingController;
