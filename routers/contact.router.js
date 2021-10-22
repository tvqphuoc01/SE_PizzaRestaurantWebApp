/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.Controller');

router.get('/', contactController.contactGet);

module.exports = router;
