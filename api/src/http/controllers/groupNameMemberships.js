const { validationResult } = require('express-validator');

const responder = require('../../core/responder');
const membershipGoggles = require('./goggles/membership.goggles');
const membershipCreator = require('../../managers/groupNameMembership/creator');

const create = (req, res) => {
    if (validationResult(req).errors.length !== 0) {
        responder.badRequestResponse(
            res,
            'Invalid parameters',
            validationResult(req).errors.map((error) => error.msg),
        );
        return;
    }

    const createGroupNameMembershipRequest = {
        nameUuid: req.body.nameId,
        groupUuid: req.body.groupId,
        addedBy: req.body.user.userUuid,
    };

    membershipCreator.create(createGroupNameMembershipRequest).then((membership) => {
        responder.itemCreatedResponse(res, membershipGoggles(membership));
    }).catch((err) => {
        switch (err.constructor) {
        default:
            console.log(err);
            responder.ohShitResponse(res, { message: 'Unable to add name to group' });
        }
    });
};

const fetch = (req, res) => {
    responder.successResponse(res, { message: 'Fetch group name memberships' });
};

const remove = (req, res) => {
    responder.successResponse(res, { message: 'Remove group name membership' });
};

module.exports = {
    create,
    fetch,
    remove,
};
