const {
    UserNotFoundError,
} = require('../../core/errors');
const User = require('../../core/models/user');

const remove = async (id) => {
    const user = await User.findOne({ where: { id } });
    if (user === null) {
        throw new UserNotFoundError();
    }

    await user.destroy();
};

module.exports = {
    remove,
};

