const express = require('express');

const router = express.Router();

const controller = require('../../controllers/locations.controller');

const { validate } = require('../../controllers/validators/locations.validator');

const { authenticate } = require('../../middleware/auth');

router.get('/', [authenticate], controller.index);
router.get('/:uuid', [authenticate, validate('fetch')], controller.fetch);
router.post('/', [authenticate, validate('create')], controller.create);
router.delete('/:uuid', [authenticate, validate('remove')], controller.remove);

router.get('/:uuid/names', [authenticate, validate('fetchNames')], controller.fetchNames);
router.post('/:uuid/add', [authenticate, validate('addName')], controller.addName);
router.delete('/:uuid/:relationshipUuid', [authenticate, validate('removeName')], controller.removeName);

module.exports = router;
