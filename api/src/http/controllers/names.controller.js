const { validationResult } = require('express-validator');

const responder = require('../../core/responder');
const nameGoggles = require('./goggles/name.goggles');
const { GroupNotFoundError, ContactNotFoundError } = require('../../core/errors');

const index = (req, res) => {
};

const fetch = (req, res) => {
};

const create = (req, res) => {
};

const remove = (req, res) => {
};

module.exports = {
    index,
    fetch,
    create,
    remove,
};
