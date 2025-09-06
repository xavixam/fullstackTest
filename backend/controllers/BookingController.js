const { Op } = require('sequelize');
const { Booking } = require('../models');

module.exports = {
  async create(req, res, next) {
    try {
      const { vehicleId, startDate, endDate, firstName, lastName } = req.body;

      if (!vehicleId || !startDate || !endDate) {
        return res.status(400).json({ error: 'vehicleId, startDate and endDate are required' });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        return res.status(400).json({ error: 'startDate must be before endDate' });
      }

      const overlapping = await Booking.findOne({
        where: {
          vehicleId,
          startDate: { [Op.lt]: end },
          endDate: { [Op.gt]: start }
        }
      });

      if (overlapping) {
        return res.status(400).json({ error: 'The vehicle is already booked' });
      }

      const booking = await Booking.create({
        firstName,
        lastName,
        vehicleId,
        startDate: start,
        endDate: end
      });

      res.status(201).json(booking);

    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).json({ message: "There was a problem", error });
    }
  },
};