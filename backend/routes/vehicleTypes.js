const express = require('express');
const router = express.Router();
const VehicleTypeController = require('../controllers/VehicleTypeController');

router.get('/', VehicleTypeController.getAll);
router.get('/id/:id', VehicleTypeController.getById);
router.post('/create', VehicleTypeController.create);

module.exports = router;