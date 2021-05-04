const { validationResult } = require('express-validator');

const responder = require('../../core/responder');
const groupGoggles = require('./goggles/group.goggles');
const { GroupNotFoundError } = require('../../core/errors');
const utils = require('../../core/utils');
const groupFetcher = require('../../managers/group/fetcher');
const groupCreator = require('../../managers/group/creator');

const index = async (req, res) => {
    const fetchGroupsRequest = {
        ownedBy: req.body.user.userUuid,
    };

    groupFetcher.fetchAllByUser(fetchGroupsRequest.ownedBy)
        .then((groups) => {
            responder.successResponse(res, { data: groups.map(groupGoggles) } );
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

    const fetchGroupRequest = {
        groupUuid: req.params.uuid,
        ownedBy: req.body.user.userUuid,
    };

    groupFetcher.fetch(fetchGroupRequest)
        .then((group) => {
            responder.successResponse(res, groupGoggles(group));
        })
        .catch((err) => {
            switch (err.constructor) {
            case GroupNotFoundError:
                responder.notFoundResponse(res, 'Group not found');
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

    const createGroupRequest = {
        title: req.body.title,
        ownedBy: req.body.user.userUuid,
    };

    groupCreator.create(createGroupRequest).then((group) => {
        responder.itemCreatedResponse(res, groupGoggles(group));
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

    groupFetcher.fetch(req.params.uuid)
        .then((group) => {
            responder.successResponse(res, groupGoggles(group));
        })
        .catch((err) => {
            switch (err.constructor) {
            case GroupNotFoundError:
                responder.notFoundResponse(res, 'Group not found');
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
