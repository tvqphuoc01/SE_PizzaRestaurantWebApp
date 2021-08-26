const express = require('express');
const router = express.Router();

const adminOrderController = require('../controllers/adminOrder.controller');

router.get('/', adminOrderController.adminOrderGet);

module.exports = router;