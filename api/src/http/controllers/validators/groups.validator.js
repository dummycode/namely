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
            body('title', validationError('title', '`title` is required')).isString(),
        ];
    }
    case 'remove': {
        return [
            param('uuid', validationError('uuid', '`uuid` is required')).exists(),
            param('uuid', validationError('uuid', '`uuid` must be a UUID')).isUUID(),
        ];
    }
    case 'addMember': {
        return [
            body('groupId', validationError('groupId', '`groupId` is required')).exists(),
            body(
                'groupId',
                validationError('groupId', '`groupId` must be a UUID'),
            ).isUUID(),
            body(
                'nameId',
                validationError('nameId', '`nameId` is required'),
            ).exists(),
            body(
                'nameId',
                validationError('nameId', '`nameId` must be a UUID'),
            ).isUUID(),
        ];
    }
    case 'removeMember': {
        return [
            param('id', validationError('id', '`id` is required')).exists(),
            param('id', validationError('id', '`id` must be an integer')).isUUID(),
        ];
    }
    default: {
        return () => true;
    }
    }
};
