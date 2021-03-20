const express = require('express');

const router = express.Router();

const { validate } = require('../../controllers/validators/auth.validator');

const controller = require('../../controllers/auth.controller');

router.post('/login', validate('login'), controller.login);

module.exports = router;
