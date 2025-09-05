const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/VehicleController');

router.get('/', VehicleController.getAll);
router.get('/id/:id', VehicleController.getById);
router.post('/create', VehicleController.create);

module.exports = router;