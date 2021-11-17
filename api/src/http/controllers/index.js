const { validationResult } = require('express-validator');

const responder = require('../../core/responder');
const config = require('../../core/config');
const userFetcher = require('../../managers/user/fetcher');
const {
    InvalidPasswordError,
    UserNotFoundError,
} = require('../../core/errors');
const userGoggles = require('./goggles/user.goggles');
const auth = require('../../core/auth/auth');
const utils = require('../../core/utils');

const index = (req, res) => {
    responder.successResponse(
        res,
        {
            name: config.get('app.name'),
            description: config.get('app.desc'),
            version: config.get('app.api.version'),
        },
        'API Index',
    );
};

const whoami = (req, res) => {
    if (validationResult(req).errors.length !== 0) {
        responder.badRequestResponse(
            res,
            'Invalid parameters',
            validationResult(req).errors.map((error) => error.msg),
        );
        return;
    }

    userFetcher.fetch(req.body.user.userUuid)
        .then((user) => {
            return responder.successResponse(res, userGoggles(user));
        })
        .catch((err) => {
            switch (err.constructor) {
            case UserNotFoundError:
                responder.badRequestResponse(res, 'Invalid parameters');
                return;
            default:
                utils.logError(err);
                responder.ohShitResponse(res, "Eror fetching user from database");
            }
        });
};

module.exports = {
    index,
    whoami,
};
