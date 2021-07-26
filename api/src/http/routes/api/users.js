var express = require('express')
var router = express.Router()

var { validate } = require('../../controllers/validators/users.validator')
var { authenticate, isAdmin } = require('../../middleware/auth')

var controller = require('../../controllers/users.controller')

router.get('/', [authenticate, isAdmin], controller.index)
router.get('/:uuid', validate('fetch'), controller.fetch)
router.post('/', validate('register'), controller.register)
router.delete('/:uuid', [authenticate, validate('remove')], controller.remove)

module.exports = router
