const responder = require('../../core/responder');

const index = (req, res) => {
    // TODO: Get friends for current account
    responder.successResponse(res, { message: 'Friends index page' });
};

const add = (req, res) => {
    // TODO: Add friend for current account
    responder.successResponse(res, { message: 'Remove friend' });
};

const remove = (req, res) => {
    // TODO: Remove friend for current account
    responder.successResponse(res, { message: 'Remove friend' });
};

module.exports = {
    index,
    add,
    remove,
};
