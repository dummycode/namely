const { validationResult } = require('express-validator');

const responder = require('../../core/responder');
const locationGoggles = require('./goggles/location.goggles');
const relationshipGoggles = require('./goggles/relationship.goggles');

const { LocationNotFoundError } = require('../../core/errors');
const utils = require('../../core/utils');
const locationFetcher = require('../../managers/location/fetcher');
const locationCreator = require('../../managers/location/creator');
const locationRemover = require('../../managers/location/remover');
const locationNameRelationshipCreator = require('../../managers/locationNameRelationship/creator');

const index = async (req, res) => {
    const fetchLocationsRequest = {
        createdBy: req.body.user.userUuid,
    };

    locationFetcher.fetchAllByUser(fetchLocationsRequest.createdBy)
        .then((locations) => {
            responder.successResponse(res, { data: locations.map(locationGoggles) });
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

    const fetchLocationRequest = {
        locationUuid: req.params.uuid,
        createdBy: req.body.user.userUuid,
    };

    locationFetcher.fetch(fetchLocationRequest)
        .then((location) => {
            responder.successResponse(res, locationGoggles(location));
        })
        .catch((err) => {
            switch (err.constructor) {
            case LocationNotFoundError:
                responder.notFoundResponse(res, 'Location not found');
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

    const createLocationRequest = {
        name: req.body.name,
        createdBy: req.body.user.userUuid,
    };

    locationCreator.create(createLocationRequest).then((location) => {
        responder.itemCreatedResponse(res, locationGoggles(location));
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

    locationRemover.remove(req.params.uuid)
        .then(() => {
            responder.itemDeletedResponse(res, 'Successfully deleted location');
        })
        .catch((err) => {
            switch (err.constructor) {
            case LocationNotFoundError:
                responder.notFoundResponse(res, 'Location not found');
                return;
            default:
                utils.logError({ err, message: err.message });
                responder.ohShitResponse(res, 'Unknown error occurred');
            }
        });
};

const addName = (req, res) => {
    if (validationResult(req).errors.length !== 0) {
        responder.badRequestResponse(
            res,
            'Invalid parameters',
            validationResult(req).errors.map((error) => error.msg),
        );
        return;
    }

    const createLocationNameRelationshipRequest = {
        nameUuid: req.body.nameUuid,
        locationUuid: req.params.uuid,
        createdBy: req.body.user.userUuid,
    };

    locationNameRelationshipCreator.create(createLocationNameRelationshipRequest).then((relationship) => {
        responder.itemCreatedResponse(res, relationshipGoggles(relationship));
    }).catch((err) => {
        switch (err.constructor) {
        default:
            console.log(err);
            responder.ohShitResponse(res, { message: 'Unable to add name to location' });
        }
    });
};

const fetchNames = (req, res) => {
    responder.successResponse(res, { message: 'Fetch location name relationship' });
};

const removeName = (req, res) => {
    responder.successResponse(res, { message: 'Remove location name relationship' });
};



module.exports = {
    index,
    fetch,
    create,
    remove,
    addName,
    fetchNames,
    removeName,
};
