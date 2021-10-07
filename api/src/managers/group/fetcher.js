const {
    GroupNotFoundError,
} = require('../../core/errors');
const Name = require('../../core/models/name');

const db = require('../../core/models/index');

const fetchAllByUser = async (ownedBy) => {
    return Group.findAll({ where: { ownedBy } });
}

const fetch = async (fetchGroupRequest) => {
    const Group = db.Group;
    console.log({ db, Group });

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
