/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog.Controller');

router.get('/', blogController.blogGet);

module.exports = router;
