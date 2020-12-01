'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const {body} = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

module.exports = router;