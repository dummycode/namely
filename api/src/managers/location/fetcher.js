const {
    LocationNotFoundError,
} = require('../../core/errors');
const Location = require('../../core/models/location');
const Name = require('../../core/models/name');

const fetchAllByUser = async (createdBy) => Location.findAll({ where: { createdBy } });

const fetch = async (fetchLocationRequest) => {
    const { locationUuid, createdBy } = fetchLocationRequest;
    const loc = await Location.findOne({
        where: { locationUuid, createdBy },
        include: { model: Name, as: 'names' },
    });
    if (loc === null) {
        throw new LocationNotFoundError();
    }

    return loc;
};

module.exports = {
    fetchAllByUser,
    fetch,
};
