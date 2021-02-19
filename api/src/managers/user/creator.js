const bcrypt = require('bcryptjs');
const {
    UserAlreadyExistsError,
    EncryptionFailedError,
    InvalidPasswordError,
} = require('../../core/errors');
const User = require('../../core/models/user');

const create = async (username, password, email) => {
    const exists = await User.findOne({ where: { username } });

    if (exists) {
        throw new UserAlreadyExistsError();
    }

    if (password.length < 8) {
        throw new InvalidPasswordError();
    }

    const passwordHashed = await new Promise((resolve) => {
        bcrypt.hash(password, 8, (err, hash) => {
            if (err) {
                throw new EncryptionFailedError();
            }
            resolve(hash);
        });
    });

    const newUser = await User.create({
        username,
        password: passwordHashed,
        email,
    });

    return newUser;
};

module.exports = {
    create,
};
