const {
    NameNotFoundError,
} = require('../../core/errors');
const Name = require('../../core/models/name');

const fetchAllByUser = async (createdBy) => {
    return Name.findAll({ where: { createdBy } });
}

const fetch = async (fetchNameRequest) => {
    const { nameUuid, createdBy } = fetchNameRequest
    const name = await Name.findOne({ where: { nameUuid, createdBy } });
    if (name === null) {
        throw new NameNotFoundError();
    }

    return name;
};

module.exports = {
    fetchAllByUser,
    fetch,
};
