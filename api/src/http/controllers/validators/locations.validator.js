const { body, param } = require('express-validator');
const { validationError } = require('../../../core/utils');

exports.validate = (method) => {
    switch (method) {
    case 'fetch': {
        return [
            param('uuid', validationError('uuid', '`uuid` is required')).exists(),
            param('uuid', validationError('uuid', '`uuid` must be an uuid')).isUUID(),
        ];
    }
    case 'create': {
        return [
            body('name', validationError('name', '`name` is required')).isString(),
        ];
    }
    case 'remove': {
        return [
            param('uuid', validationError('uuid', '`uuid` is required')).exists(),
            param('uuid', validationError('uuid', '`uuid` must be an uuid')).isUUID(),
        ];
    }
    case 'fetchNames': {
        return [
            param('uuid', validationError('uuid', '`uuid` is required')).exists(),
            param('uuid', validationError('uuid', '`uuid` must be an uuid')).isUUID(),
        ];
    }
    case 'addName': {
        return [
            param('uuid', validationError('uuid', '`uuid` is required')).exists(),
            param('uuid', validationError('uuid', '`uuid` must be an uuid')).isUUID(),
            body('nameUuid', validationError('nameUuid', '`uuid` is required')).exists(),
            body('nameUuid', validationError('nameUuid', '`name` is must be an uuid')).isUUID(),
        ];
    }
    default: {
        return (_req, _res, next) => {
            next();
            console.log("Default validator");
            return true;
        };
    }
    }
};
