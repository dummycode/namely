const { filterModel } = require('./abstract.goggles');

module.exports = (group) => {
    const filter = ['nameUuid', 'groupUuid'];
    return filterModel(group, filter);
};
