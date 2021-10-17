const { filterModel } = require('./abstract.goggles');

module.exports = (group) => {
    const filter = ['groupUuid', 'title', 'names'];
    return filterModel(group, filter);
};
