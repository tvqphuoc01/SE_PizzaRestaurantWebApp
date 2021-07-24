const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staffReservation.controller');

router.get('/', staffController.staffReservationGet);

module.exports = router;
