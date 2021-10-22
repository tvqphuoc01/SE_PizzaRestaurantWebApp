const express = require('express');
const router = express.Router();

const updateStateOrderController = require('../controllers/updateStateOrder.controller');

router.post('/', updateStateOrderController.updateStateOrderPost);

module.exports = router;