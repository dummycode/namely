const abstractGoggles = require('./abstract.goggles');

module.exports = (name) => {
    const rawName = user.get({ plain: true });
    const filter = ['uuid', 'name'];
    return abstractGoggles(rawName, filter);
};
