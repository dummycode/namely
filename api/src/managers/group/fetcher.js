const {
    GroupNotFoundError,
} = require('../../core/errors');
const Name = require('../../core/models/name');

const Group = require('../../core/models/group');

const fetchAllByUser = async (ownedBy) => {
    return Sequelize.Group.findAll({ where: { ownedBy } });
}

const fetch = async (fetchGroupRequest) => {
    const { groupUuid, ownedBy } = fetchGroupRequest
    const group = await Group.findOne({
        where: { groupUuid, ownedBy },
        include: [{ model: Name, as: "names" }]
    });
    if (group === null) {
        throw new GroupNotFoundError();
    }

    return group;
};

module.exports = {
    fetchAllByUser,
    fetch,
};
