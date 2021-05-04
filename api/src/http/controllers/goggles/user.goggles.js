const { filterModel } = require('./abstract.goggles');

module.exports = (user) => {
    const filter = ['userUuid', 'username', 'email', 'createdAt'];
    return filterModel(user, filter);
};
