const database = require('../../core/database');

const connection = database.getConnection();

const create = async (name) => {
    console.log('Create name {name}');
};

module.exports = {
    create,
};
