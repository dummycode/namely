const { validationResult } = require('express-validator');

const responder = require('../../core/responder');
const nameGoggles = require('./goggles/name.goggles');
const { NameNotFoundError } = require('../../core/errors');
const utils = require('../../core/utils');
const nameFetcher = require('../../managers/names/fetcher');

const index = async (req, res) => {
    responder.successResponse(res, {}, "Woo");

    const names = await nameFetcher.fetchAll();
    console.log(names);
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

    nameFetcher.fetch(req.params.uuid)
        .then((name) => {
            responder.successResponse(res, nameGoggles(name));
        })
        .catch((err) => {
            switch (err.constructor) {
            case NameNotFoundError:
                responder.notFoundResponse(res, 'User not found');
                return;
            default:
                utils.logError({ err, message: err.message });
                responder.ohShitResponse(res, 'Unknown error occurred');
            }
        });
};

const create = (req, res) => {
};

const remove = (req, res) => {
};

module.exports = {
    index,
    fetch,
    create,
    remove,
};
