const express = require('express');
const router = express.Router();

const cancelReservationController = require('../controllers/cancelReservation.controller');

router.post('/', cancelReservationController.canceleservationPost);

module.exports = router;