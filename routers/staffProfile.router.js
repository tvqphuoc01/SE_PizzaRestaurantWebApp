const express = require('express');
const multer = require('multer');
const upload = multer({dest: './public/uploads/'});
const router = express.Router();

const staffProfileController = require('../controllers/staffProfile.controller');

router.post('/',
    upload.single('avatar'),
    staffProfileController.staffUpdateUser,
);

router.get('/', upload.single('avatar'), staffProfileController.staffProfileGet);

module.exports = router;
