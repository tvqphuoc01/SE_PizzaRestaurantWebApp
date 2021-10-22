const express = require('express');
const router = express.Router();

const reservationStatusController = require('../controllers/reservationStatus.controller');

router.get('/', reservationStatusController.reservationStatusGet);

module.exports = router;