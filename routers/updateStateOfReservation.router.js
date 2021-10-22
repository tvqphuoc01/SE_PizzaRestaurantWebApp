const express = require('express');
const router = express.Router();

const updateStateReservationController = require('../controllers/updateStateReservation.controller');

router.post('/', updateStateReservationController.updateStateReservationPost);

module.exports = router;