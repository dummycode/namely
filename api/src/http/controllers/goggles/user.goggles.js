const { filterModel } = require('./abstract.goggles');
const nameGoggles = require('./name.goggles');

module.exports = (user) => {
    const filter = ['userUuid', 'username', 'email', 'createdAt', 'names'];
    return filterModel(user, filter);
};
