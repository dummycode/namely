const database = require('../../core/database');

const Location = require('../../core/models/location');

const create = async (createLocationRequest) => {
    const newLocation = await Location.create({
        ...createLocationRequest,
    });

    return newLocation;
};

module.exports = {
    create,
};
