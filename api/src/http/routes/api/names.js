const express = require('express');

const router = express.Router();

const controller = require('../../controllers/names');

const { validate } = require('../../controllers/validators/names.validator');

const { authenticate } = require('../../middleware/auth');

router.get('/', [authenticate], controller.index);
router.get('/:uuid', [authenticate, validate('fetch')], controller.fetch);
router.post('/', [authenticate, validate('create')], controller.create);
router.delete('/:uuid', [authenticate, validate('remove')], controller.remove);

module.exports = router;

