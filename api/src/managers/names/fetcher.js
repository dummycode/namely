const {
    NameNotFoundError,
} = require('../../core/errors');
const Name = require('../../core/models/name');

const fetchAll = async () => {
    return Name.findAll();
}

const fetch = async (uuid) => {
    const name = await Name.findOne({ where: { uuid } });
    if (name === null) {
        throw new NameNotFoundError();
    }

    return user;
};

module.exports = {
    fetchAll,
    fetch,
};
