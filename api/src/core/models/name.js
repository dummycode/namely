'use strict';

const { v4: uuidv4 } = require('uuid');
const {
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require('../../core/sequelize');

class Name extends Model {

    static associate(models) {
        this.belongsToMany(models.Group, {
            as: 'groups',
            through: models.GroupNameMembership,
            foreignKey: 'nameUuid',
            otherKey: 'groupUuid',
        });
        this.belongsToMany(models.Location, {
            as: 'locations',
            through: models.LocationNameRelationship,
            foreignKey: 'nameUuid',
            otherKey: 'locationUuid',
        });

    }

    static init(fields, sequelize) {
        super.init(fields, sequelize);

        this.removeAttribute('id');

        this.addHook('beforeSave', async (name) => {
            return name.nameUuid = uuidv4();
        });

        return this;
    }
};

const name = Name.init(
    {
        nameUuid: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        createdBy: DataTypes.UUID,
    },
    {
        sequelize,
        modelName: 'Name',
        paranoid: true,
    }
);

module.exports = name;
