const express = require('express');
const router = express.Router();

const staffCheckOrderController = require('../controllers/staffCheckOrder.controller');

router.post('/', staffCheckOrderController.StaffCheckOrderPost);

module.exports = router;