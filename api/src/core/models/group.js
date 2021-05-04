'use strict';

const { v4: uuidv4 } = require('uuid');
const {
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require('../../core/sequelize');

class Group extends Model {
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

        this.addHook('beforeSave', async (group) => {
            return group.groupUuid = uuidv4();
        });

        return this;
    }
};

const group = Group.init(
    {
        groupUuid: DataTypes.UUID,
        title: DataTypes.STRING,
        ownedBy: DataTypes.UUID,
    },
    {
        sequelize,
        modelName: 'Group',
        paranoid: true,
    }
);

module.exports = group;
