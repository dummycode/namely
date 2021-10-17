const { filterModel } = require('./abstract.goggles');

module.exports = (name) => {
    const filter = ['nameUuid', 'name', 'groups'];
    return filterModel(name, filter);
};
