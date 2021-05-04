const {
    GroupNotFoundError,
} = require('../../core/errors');
const Group = require('../../core/models/group');

const remove = async (id) => {
    const group = await Group.findOne({ where: { id } });
    if (group === null) {
        throw new GroupNotFoundError();
    }

    await group.destroy();
};

module.exports = {
    remove,
};

