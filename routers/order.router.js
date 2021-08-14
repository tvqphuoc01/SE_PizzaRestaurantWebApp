const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

const orderValidate = require('../validate/placeOrderValidate');

router.post('/', orderValidate.validateNewOrder, orderController.placeOrder);

module.exports = router;
