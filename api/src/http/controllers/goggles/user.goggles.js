const abstractGoggles = require('./abstract.goggles');

module.exports = (user) => {
    const rawUser = user.get({ plain: true });
    const filter = ['uuid', 'username', 'email', 'createdAt'];
    return abstractGoggles(rawUser, filter);
};
