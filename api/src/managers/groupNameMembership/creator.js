const GroupNameMembership = require('../../core/models/groupNameMembership');

const create = async (createGroupNameMembershipRequest) => {
    const newGroupNameMembership = await GroupNameMembership.create({
        ...createGroupNameMembershipRequest,
    });

    return newGroupNameMembership;
};

module.exports = {
    create,
};
