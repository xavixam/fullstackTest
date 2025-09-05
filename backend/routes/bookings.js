const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');

router.get('/', BookingController.getAll);
router.get('/id/:id', BookingController.getById);
router.post('/create', BookingController.create);

module.exports = router;