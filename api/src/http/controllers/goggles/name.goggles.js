const { filterModel } = require('./abstract.goggles');

module.exports = (name) => {
    const filter = ['nameUuid', 'name'];
    return filterModel(name, filter);
};
