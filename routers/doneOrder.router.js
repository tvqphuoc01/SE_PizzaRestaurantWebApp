const express = require('express');
const router = express.Router();

const doneOrderController = require('../controllers/doneOrder.controller');

router.post('/', doneOrderController.doneOrderPost);

module.exports = router;