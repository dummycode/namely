const responder = require('../../core/responder');

const index = (req, res) => {
    // TODO: Get friend requests for current account
    responder.successResponse(res, { message: 'Friend requests index page' });
};

const create = (req, res) => {
    // TODO: Create friend request
    responder.successResponse(res, { message: 'Create friend request' });
}

const decline = (req, res) => {
    // TODO: Decline friend request
    responder.successResponse(res, { message: 'Remove friend request' });
};

const accept = (req, res) => {
    // TODO: Accept friend request
    responder.successResponse(res, { message: 'Accept friend request' });
};

module.exports = {
    index,
    decline,
    accept,
};
