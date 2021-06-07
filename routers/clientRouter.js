/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

router.post('/', clientController.addClient);

router.get('/', clientController.clientGet);

module.exports = router;
