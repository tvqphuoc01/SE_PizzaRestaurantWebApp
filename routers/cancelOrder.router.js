const express = require('express');
const router = express.Router();

const cancelOrderController = require('../controllers/cancelOrder.controller');

router.post('/', cancelOrderController.cancelOrderPost);

module.exports = router;