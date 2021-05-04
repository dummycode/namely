const {
    GroupNotFoundError,
} = require('../../core/errors');
const Group = require('../../core/models/group');

const fetchAllByUser = async (ownedBy) => {
    return Group.findAll({ where: { ownedBy } });
}

const fetch = async (fetchGroupRequest) => {
    const { groupUuid, ownedBy } = fetchGroupRequest
    const group = await Group.findOne({ where: { groupUuid, ownedBy } });
    if (group === null) {
        throw new GroupNotFoundError();
    }

    return group;
};

module.exports = {
    fetchAllByUser,
    fetch,
};
