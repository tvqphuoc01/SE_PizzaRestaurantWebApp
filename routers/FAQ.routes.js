/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const FAQController = require('../controllers/FAQ.Controller');

router.get('/', FAQController.FAQGet);

module.exports = router;
