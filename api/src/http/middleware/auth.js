const jwt = require('jsonwebtoken');

const responder = require('../../core/responder');
const config = require('../../core/config');
const userFetcher = require('../../managers/user/fetcher');
const { UserNotFoundError } = require('../../core/errors');
const utils = require('../../core/utils');

exports.authenticate = (req, res, next) => {
    const token = req.headers['secret-identity'];
    if (!token) {
        return responder.unauthorizedResponse(res, 'No token provided');
    }

    jwt.verify(token, config.get('auth.secret'), (jwtErr, decoded) => {
        if (jwtErr) {
            utils.logError({ jwtErr, message: jwtErr.message });
            return responder.unauthorizedResponse(res, 'Failed to authenticate token');
        }

        // Otherwise, good to go
        userFetcher.fetch(decoded.uuid)
            .then((user) => {
                req.body.user = user.get({ plain: true });
                return next();
            })
            .catch((err) => {
                switch (err.constructor) {
                case UserNotFoundError:
                    return responder.badRequestResponse(res, 'User not found');
                default:
                    utils.logError({ err, message: err.message });
                    return responder.ohShitResponse(res, 'Unknown error occurred');
                }
            });
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.body.user.isAdmin) {
        return next();
    }

    return responder.unauthorizedResponse(res, 'Permission denied');
};
