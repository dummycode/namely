const {
    UserNotFoundError,
} = require('../../core/errors');
const User = require('../../core/models/user');
const Name = require('../../core/models/name');

const fetchAll = async () => User.findAll();

const fetch = async (uuid) => {
    const user = await User.findOne({
        where: { userUuid: uuid },
        include: [{ model: Name, as: 'names' }]
    });
    if (user === null) {
        throw new UserNotFoundError();
    }

    return user;
};

const fetchByUsername = async (username) => {
    const user = await User.findOne({ where: { username } });
    if (user === null) {
        throw new UserNotFoundError();
    }

    return user;
};

module.exports = {
    fetchAll,
    fetch,
    fetchByUsername,
};
