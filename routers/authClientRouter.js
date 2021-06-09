/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const clientController = require('../controllers/logInController');

const clientValidate = require('../validate/logInValidate');

router.get('/', clientController.clientLogin);

router.post('/', clientValidate.validateLoginClient, clientController.clientPostLogin);

module.exports = router;
