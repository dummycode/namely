const express = require('express');

const router = express.Router();

const controller = require('../../controllers/names.controller');

const { validate } = require('../../controllers/validators/names.validator');

const { authenticate } = require('../../middleware/auth.middleware');

router.get('/', [authenticate], controller.index);
router.get('/:id', [authenticate], controller.fetch);
router.post('/', [authenticate, validate('create')], controller.create);
router.delete('/:id', [authenticate, validate('remove')], controller.remove);

module.exports = router;
