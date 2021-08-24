const express = require('express');
const router = express.Router();

const adminLoginController = require('../controllers/adminLogin.controller');

const adminValidate = require('../validate/adminValidate');

router.get('/', adminLoginController.adminLogin);

router.post('/', adminValidate.validateLoginAdmin, adminLoginController.adminPostLogin);

module.exports = router;