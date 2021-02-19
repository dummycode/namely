'use strict';

const { v4: uuidv4 } = require('uuid');

const {
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require('../../core/sequelize');

class FriendRequest extends Model {
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

        this.addHook('beforeSave', async (friendRequest) => {
            return friendRequest.uuid = uuidv4();
        });

        return this;
    }
};

const friendRequest = FriendRequest.init(
    {
        uuid: DataTypes.UUID,
        from: DataTypes.UUID,
        to: DataTypes.UUID,
    },
    {
        sequelize,
        modelName: 'FriendRequest',
        paranoid: true,
    }
);


module.exports = user;
