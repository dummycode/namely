const express = require('express');

const router = express.Router();

const controller = require('../../controllers/index.controller');

const { authenticate } = require('../../middleware/auth.middleware');

router.get('/', controller.index);
router.get('/whoami', authenticate, controller.whoami);

module.exports = router;
