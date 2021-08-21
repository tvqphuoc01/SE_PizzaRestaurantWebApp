const express = require('express');
const router = express.Router();

const staffCheckReservationController = require('../controllers/staffCheckReservation.controller');

router.post('/', staffCheckReservationController.StaffCheckReservationPost);

module.exports = router;