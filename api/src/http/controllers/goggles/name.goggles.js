const { filterModel } = require('./abstract.goggles');

module.exports = (name) => {
    const filter = ['nameUuid', 'first', 'last'];
    return filterModel(name, filter);
};
