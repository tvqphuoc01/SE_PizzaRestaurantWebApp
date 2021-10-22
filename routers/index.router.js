/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index.Controller');

router.get('/', indexController.indexGet);

module.exports = router;
