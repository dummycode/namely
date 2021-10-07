const { filterModel } = require('./abstract.goggles');
const nameGoggles = require('./name.goggles');

module.exports = (user) => {
    console.log(user.Names);
    const filter = ['userUuid', 'username', 'email', 'createdAt', 'names'];
    return filterModel(user, filter);
};
