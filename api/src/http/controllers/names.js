const { validationResult } = require('express-validator');

const responder = require('../../core/responder');
const nameGoggles = require('./goggles/name.goggles');
const { NameNotFoundError } = require('../../core/errors');
const utils = require('../../core/utils');
const nameFetcher = require('../../managers/name/fetcher');
const nameCreator = require('../../managers/name/creator');
const nameRemover = require('../../managers/name/remover');

const index = async (req, res) => {
    const fetchNamesRequest = {
        createdBy: req.body.user.userUuid,
    };

    nameFetcher.fetchAllByUser(fetchNamesRequest.createdBy)
        .then((names) => {
            responder.successResponse(res, { data: names.map(nameGoggles) });
        })
        .catch((err) => {
            switch (err.constructor) {
            default:
                utils.logError({ err, message: err.message });
                responder.ohShitResponse(res, 'Unknown error occurred');
            }
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

    const fetchNameRequest = {
        nameUuid: req.params.uuid,
        createdBy: req.body.user.userUuid,
    };

    nameFetcher.fetch(fetchNameRequest)
        .then((name) => {
            responder.successResponse(res, nameGoggles(name));
        })
        .catch((err) => {
            switch (err.constructor) {
            case NameNotFoundError:
                responder.notFoundResponse(res, 'Name not found');
                return;
            default:
                utils.logError({ err, message: err.message });
                responder.ohShitResponse(res, 'Unknown error occurred');
            }
        });
};

const create = (req, res) => {
    if (validationResult(req).errors.length !== 0) {
        responder.badRequestResponse(
            res,
            'Invalid parameters',
            validationResult(req).errors.map((error) => error.msg),
        );
        return;
    }

    const createNameRequest = {
        name: req.body.name,
        createdBy: req.body.user.userUuid,
    };

    nameCreator.create(createNameRequest).then((name) => {
        responder.itemCreatedResponse(res, nameGoggles(name));
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

    nameRemover.remove(req.params.uuid)
        .then(() => {
            responder.itemDeletedResponse(res, 'Successfully deleted name');
        })
        .catch((err) => {
            switch (err.constructor) {
            case NameNotFoundError:
                responder.notFoundResponse(res, 'Name not found');
                return;
            default:
                utils.logError({ err, message: err.message });
                responder.ohShitResponse(res, 'Unknown error occurred');
            }
        });
};

module.exports = {
    index,
    fetch,
    create,
    remove,
};
