const { filterModel } = require('./abstract.goggles');

module.exports = (loc) => {
    const filter = ['locationUuid', 'title', 'createdAt'];
    return filterModel(loc, filter);
};
