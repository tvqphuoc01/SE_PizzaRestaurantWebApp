/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');

router.get('/', profileController.profileGet);

module.exports = router;
