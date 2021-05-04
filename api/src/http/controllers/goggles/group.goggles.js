const { filterModel } = require('./abstract.goggles');

module.exports = (group) => {
    const filter = ['groupUuid', 'title'];
    return filterModel(group, filter);
};
