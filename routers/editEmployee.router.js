const express = require('express');
const router = express.Router();

const editEmployeeController = require('../controllers/editEmployee.controller');

router.post('/', editEmployeeController.editEmployee);

module.exports = router;