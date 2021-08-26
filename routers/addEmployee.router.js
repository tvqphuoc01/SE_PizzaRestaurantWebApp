const express = require('express');
const router = express.Router();

const addEmployeeController = require('../controllers/addEmplyeeController.controller');

router.post('/', addEmployeeController.addEmployee);

module.exports = router;
