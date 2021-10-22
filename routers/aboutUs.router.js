/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const aboutUsController = require('../controllers/aboutUs.controller');

router.get('/', aboutUsController.aboutUsGet);

module.exports = router;
