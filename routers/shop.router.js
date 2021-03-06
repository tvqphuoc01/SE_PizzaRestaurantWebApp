/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.Controller');

router.get('/', shopController.shopGet);

router.post('/', shopController.shopPost);

module.exports = router;
