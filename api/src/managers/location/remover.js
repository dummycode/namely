const {
    NameNotFoundError,
} = require('../../core/errors');
const Name = require('../../core/models/name');

const remove = async (nameUuid) => {
    const name = await Name.findOne({ where: { nameUuid } });
    if (name === null) {
        throw new NameNotFoundError();
    }

    await name.destroy();
};

module.exports = {
    remove,
};

