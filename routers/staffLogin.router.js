const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staffLogin.Controller');

const staffValidate = require('../validate/staffLoginValidate');

router.get('/', staffController.staffLogin);

router.post('/', staffValidate.validateLoginStaff, staffController.staffPostLogin);

module.exports = router;
