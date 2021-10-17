const nameFetcher = require('../name/fetcher');
const groupFetcher = require('../group/fetcher');
const GroupNameMembership = require('../../core/models/groupNameMembership');

const create = async (createGroupNameMembershipRequest) => {
    await nameFetcher.fetch({
        nameUuid: createGroupNameMembershipRequest.nameUuid,
        createdBy: createGroupNameMembershipRequest.addedBy,
    });
    await groupFetcher.fetch({
        groupUuid: createGroupNameMembershipRequest.groupUuid,
        ownedBy: createGroupNameMembershipRequest.addedBy,
    });

    const newGroupNameMembership = await GroupNameMembership.create({
        ...createGroupNameMembershipRequest,
    });

    return newGroupNameMembership;
};

module.exports = {
    create,
};
