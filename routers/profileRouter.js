/* eslint-disable new-cap */
const express = require('express');
const multer = require('multer');
const upload = multer({dest: './public/uploads/'});
const router = express.Router();

const profileController = require('../controllers/profileController');

router.post('/',
    upload.single('avatar'),
    profileController.updateClient,
);

router.get('/', upload.single('avatar'), profileController.profileGet);

module.exports = router;
