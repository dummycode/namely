const {
    NameNotFoundError,
} = require('../../core/errors');
const Name = require('../../core/models/name');
const Group = require('../../core/models/group');

const fetchAllByUser = async (createdBy) => Name.findAll({ where: { createdBy } });

const fetch = async (fetchNameRequest) => {
    const { nameUuid, createdBy } = fetchNameRequest;
    const name = await Name.findOne({
        where: { nameUuid, createdBy },
        include: { model: Group, as: 'groups' },
    });
    if (name === null) {
        throw new NameNotFoundError();
    }

    return name;
};

module.exports = {
    fetchAllByUser,
    fetch,
};
