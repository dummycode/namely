'use strict';

const { v4: uuidv4 } = require('uuid');
const {
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require('../../core/sequelize');

class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }

    static init(fields, sequelize) {
        super.init(fields, sequelize);

        this.removeAttribute('id');

        this.addHook('beforeSave', async (user) => {
            return user.userUuid = uuidv4();
        });

        return this;
    }
};

const user = User.init(
    {
        userUuid: DataTypes.UUID,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
    },
    {
        sequelize,
        modelName: 'User',
        paranoid: true,
    }
);


module.exports = user;
