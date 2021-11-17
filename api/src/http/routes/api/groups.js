const express = require('express');

const router = express.Router();

const controller = require('../../controllers/groups');
const groupMembershipController = require('../../controllers/groupNameMemberships');

const { validate } = require('../../controllers/validators/groups.validator');

const { authenticate } = require('../../middleware/auth');

router.get('/', [authenticate], controller.index);
router.get('/:uuid', [authenticate, validate('fetch')], controller.fetch);
router.post('/', [authenticate, validate('create')], controller.create);
router.delete('/:uuid', [authenticate, validate('remove')], controller.remove);
router.post('/:uuid/add', [authenticate, validate('addMember')], groupMembershipsController.create);

module.exports = router;
