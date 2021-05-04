const abstractGoggles = require('./abstract.goggles');

module.exports = (name) => {
    const rawName = name.get({ plain: true });
    const filter = ['nameUuid', 'first', 'last'];
    return abstractGoggles(rawName, filter);
};
