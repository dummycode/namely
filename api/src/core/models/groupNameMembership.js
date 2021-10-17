'use strict';

const {
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require('../../core/sequelize');

class GroupNameMembership extends Model {
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

        return this;
    }
};

const groupNameMembership = GroupNameMembership.init(
    {
        groupUuid: DataTypes.UUID,
        nameUuid: DataTypes.UUID,
        addedBy: DataTypes.UUID,
    },
    {
        sequelize,
        modelName: 'GroupNameMembership',
        paranoid: true,
    }
);

module.exports = groupNameMembership;

