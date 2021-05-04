const responder = require('../../core/responder');

const create = (req, res) => {
    responder.successResponse(res, { message: 'Create group name membership' });
}

const fetch = (req, res) => {
    responder.successResponse(res, { message: 'Fetch group name memberships' });
};

const remove = (req, res) => {
    responder.successResponse(res, { message: 'Remove group name membership' });
};

module.exports = {
    create,
    fetch,
};
