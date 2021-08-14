const express = require('express');
const router = express.Router();

const orderStatusController = require('../controllers/orderStatus.controller');

router.get('/', orderStatusController.orderStatusGet);

module.exports = router;