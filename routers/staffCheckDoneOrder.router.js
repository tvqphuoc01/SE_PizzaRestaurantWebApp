const express = require('express');
const router = express.Router();

const staffCheckDoneOrderController = require('../controllers/staffCheckDoneOrder.controller');

router.post('/', staffCheckDoneOrderController.StaffCheckDoneOrderPost);

module.exports = router;