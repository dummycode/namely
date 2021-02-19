const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {
    EncryptionFailedError,
    InvalidPasswordError,
} = require('../errors');
const userFetcher = require('../../managers/user/fetcher');

const login = async (username, password) => {
    const user = await userFetcher.fetchByUsername(username);

    return bcrypt
        .compare(password, user.password)
        .then((valid) => {
            if (!valid) {
                throw new InvalidPasswordError();
            }

            const token = jwt.sign(
                { uuid: user.uuid },
                config.get('auth.secret'),
                { expiresIn: config.get('auth.timeout') },
            );

            return token;
        })
        .catch((err) => {
            switch (err.constructor) {
            case InvalidPasswordError:
                throw new InvalidPasswordError();
            default:
                throw new EncryptionFailedError();
            }
        });
};

module.exports = {
    login,
};
