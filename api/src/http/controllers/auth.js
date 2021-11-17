const { validationResult } = require('express-validator');

const responder = require('../../core/responder');
const {
    InvalidPasswordError,
    UserNotFoundError,
} = require('../../core/errors');
const auth = require('../../core/auth/auth');
const utils = require('../../core/utils');

const login = (req, res) => {
    if (validationResult(req).errors.length !== 0) {
        responder.badRequestResponse(
            res,
            'Invalid parameters',
            validationResult(req).errors.map((error) => error.msg),
        );
        return;
    }

    const { username, password } = req.body;

    auth.login(username, password)
        .then((token) => {
            responder.successResponse(res, { token }, 'Logged in');
        })
        .catch((err) => {
            switch (err.constructor) {
            case UserNotFoundError:
            case InvalidPasswordError:
                responder.unauthorizedResponse(res, 'Invalid login');
                return;
            default:
                utils.logError(err);
                responder.ohShitResponse(res, 'Unknown error occurred');
            }
        });
};

module.exports = {
    login,
};
