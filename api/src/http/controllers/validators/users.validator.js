const { body, param } = require('express-validator');
const { validationError } = require('../../../core/utils');

exports.validate = (method) => {
    switch (method) {
    case 'register': {
        return [
            body(
                'username',
                validationError('username', '`username` is required'),
            ).isString(),
            body('username', validationError('username', '`username` is not valid')).isLength({ min: 3, max: 20 }),
            body(
                'password',
                validationError('password', '`password` is required'),
            ).isString(),
            body('password', validationError('password', '`password` is not valid')).isLength({ min: 6 }),
            body('email', validationError('email', '`email` is required')).isString(),
            body('email', validationError('email', '`email` is not valid')).isEmail(),
        ];
    }
    case 'login': {
        return [
            body(
                'username',
                validationError('username', '`username` is required'),
            ).isString(),
            body(
                'password',
                validationError('password', '`password` is required'),
            ).isString(),
        ];
    }
    case 'remove': {
        return [
            param('uuid', validationError('uuid', '`uuid` is required')).exists(),
            param('uuid', validationError('uuid', '`uuid` must be a valid uuid')).isUUID(4),
        ];
    }
    case 'fetch': {
        return [
            param('uuid', validationError('uuid', '`uuid` is required')).exists(),
            param('uuid', validationError('uuid', '`uuid` must be a valid uuid')).isUUID(4),
        ];
    }
    default: {
        return () => true;
    }
    }
};
