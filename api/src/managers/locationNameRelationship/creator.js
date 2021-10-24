const nameFetcher = require('../name/fetcher');
const locationFetcher = require('../location/fetcher');
const LocationNameRelationship = require('../../core/models/locationNameRelationship');

const create = async (request) => {
    const relationship = await LocationNameRelationship.findOne({
        where: {
            nameUuid: request.nameUuid,
            locationUuid: request.locationUuid,
            createdBy: request.createdBy
        },
    });
    if (relationship !== null) {
        return relationship;
    }

    return name;


    await nameFetcher.fetch({
        nameUuid: request.nameUuid,
        createdBy: request.createdBy,
    });
    await locationFetcher.fetch({
        locationUuid: request.locationUuid,
        createdBy: request.createdBy,
    });

    const newLocationNameRelationship = await LocationNameRelationship.create({
        ...request,
    });

    return newLocationNameRelationship;
};

module.exports = {
    create,
};
