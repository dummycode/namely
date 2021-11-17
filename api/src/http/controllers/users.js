const { validationResult } = require('express-validator');

const responder = require('../../core/responder');

const {
    UserNotFoundError,
    UserAlreadyExistsError,
} = require('../../core/errors');

const userFetcher = require('../../managers/user/fetcher');
const userCreator = require('../../managers/user/creator');
const userRemover = require('../../managers/user/remover');

const userGoggles = require('./goggles/user.goggles');

const utils = require('../../core/utils');

/**
 * Index controller
 */
const index = (req, res) => {
    userFetcher.fetchAll()
        .then((users) => {
            responder.successResponse(res, { data: users.map(userGoggles) } );
        });
};

const fetch = (req, res) => {
    if (validationResult(req).errors.length !== 0) {
        responder.badRequestResponse(
            res,
            'Invalid parameters',
            validationResult(req).errors.map((error) => error.msg),
        );
        return;
    }

    userFetcher.fetch(req.params.uuid)
        .then((user) => {
            responder.successResponse(res, userGoggles(user) );
        })
        .catch((err) => {
            switch (err.constructor) {
            case UserNotFoundError:
                responder.notFoundResponse(res, 'User not found');
                return;
            default:
                utils.logError({ err, message: err.message });
                responder.ohShitResponse(res, 'Unknown error occurred');
            }
        });

}

const register = (req, res) => {
    if (validationResult(req).errors.length !== 0) {
        responder.badRequestResponse(
            res,
            'Invalid parameters',
            validationResult(req).errors.map((error) => error.msg),
        );
        return;
    }

    userCreator.create(req.body.username, req.body.password, req.body.email)
        .then((user) => {
            responder.itemCreatedResponse(res, userGoggles(user), 'User created');
        })
        .catch((err) => {
            switch (err.constructor) {
            case UserAlreadyExistsError:
                responder.badRequestResponse(res, 'User already exists');
                return;
            default:
                utils.logError({ err, message: err.message });
                responder.ohShitResponse(res, 'Unknown error occurred');
            }
        });
};

const remove = (req, res) => {
    if (validationResult(req).errors.length !== 0) {
        responder.badRequestResponse(
            res,
            'Invalid parameters',
            validationResult(req).errors.map((error) => error.msg),
        );
        return;
    }

    userRemover.remove(req.params.uuid)
        .then(() => {
            responder.itemDeletedResponse(res, 'Successfully deleted user');
        })
        .catch((err) => {
            switch (err.constructor) {
            case UserNotFoundError:
                responder.notFoundResponse(res, 'User not found');
                break;
            default:
                utils.logError(err);
                responder.ohShitResponse(res, err);
            }
        });
};

module.exports = {
    index,
    fetch,
    register,
    remove,
};
