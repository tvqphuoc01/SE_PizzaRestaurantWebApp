/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

const validateClient = require('../validate/signUpValidate');

router.post('/', validateClient.validateNewUser, clientController.addClient);

router.get('/', clientController.clientGet);

module.exports = router;
