/* eslint-disable new-cap */
const express = require('express');
const multer = require('multer');
const upload = multer({dest: './public/uploads/'});
const router = express.Router();

const clientController = require('../controllers/clientController');

const validateClient = require('../validate/signUpValidate');

router.post('/',
    upload.single('avatar'),
    validateClient.validateNewUser,
    clientController.addClient,
);

router.get('/', clientController.clientGet);

module.exports = router;
