const express = require('express');
const router = express.Router();

const deleteEmployeeController = require('../controllers/deleteEmployee.controller');

router.post('/', deleteEmployeeController.deleteEmployee);

module.exports = router;