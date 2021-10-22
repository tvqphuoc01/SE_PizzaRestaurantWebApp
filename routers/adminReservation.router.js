const express = require('express');
const router = express.Router();

const adminReservationController = require('../controllers/adminReservation.controller');

router.get('/', adminReservationController.adminReservationGet);

module.exports = router;