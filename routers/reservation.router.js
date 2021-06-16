/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservation.Controller');

router.get('/', reservationController.reservationGet);

module.exports = router;
