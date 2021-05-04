const database = require('../../core/database');
const connection = database.getConnection();

const Group = require('../../core/models/group');

const create = async (createGroupRequest) => {
    const newGroup = await Group.create({
        ...createGroupRequest,
    });

    return newGroup;
};

module.exports = {
    create,
};
