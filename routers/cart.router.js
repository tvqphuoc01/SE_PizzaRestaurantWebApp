const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.Controller');

router.get('/', cartController.cartGet);

router.post('/', cartController.cartPost);

module.exports = router;