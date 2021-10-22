const express = require('express');
const router = express.Router();

const doneReservationController = require('../controllers/doneReservation.controller');

router.post('/', doneReservationController.doneReservationPost);

module.exports = router;