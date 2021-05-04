const { body, param } = require('express-validator');
const { validationError } = require('../../../core/utils');

exports.validate = (method) => {
    switch (method) {
    case 'fetch': {
        return [
            param('uuid', validationError('uuid', '`uuid` is required')).exists(),
            param('uuid', validationError('uuid', '`uuid` must be an integer')).isUUID(),
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
            param('uuid', validationError('uuid', '`uuid` must be an integer')).isUUID(),
        ];
    }
    default: {
        return () => true;
    }
    }
};
