/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.Controller');

router.get('/', serviceController.serviceGet);

module.exports = router;
