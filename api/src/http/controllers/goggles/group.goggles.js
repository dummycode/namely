const abstractGoggles = require('./abstract.goggles');

module.exports = (group) => {
    const rawName = group.get({ plain: true });
    const filter = ['groupUuid', 'title'];
    return abstractGoggles(rawName, filter);
};
