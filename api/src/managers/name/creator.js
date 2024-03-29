const database = require('../../core/database');

const Name = require('../../core/models/name');

const create = async (createNameRequest) => {
    const newName = await Name.create({
        ...createNameRequest,
    });

    return newName;
};

module.exports = {
    create,
};
