'use strict';

const { v4: uuidv4 } = require('uuid');
const {
    Model,
    DataTypes
} = require('sequelize');

const Name = require('./name');

const sequelize = require('../../core/sequelize');

class Location extends Model {

    static associate(models) {
        this.belongsToMany(models.Name, {
            as: 'names',
            through: models.LocationNameRelationship,
            foreignKey: 'locationUuid',
            otherKey: 'nameUuid',
        });
    }

    static init(fields, sequelize) {
        super.init(fields, sequelize);

        this.removeAttribute('id');

        this.addHook('beforeSave', async (loc) => {
            return loc.locationUuid = uuidv4();
        });

        return this;
    }
};

const loc = Location.init(
    {
        locationUuid: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        createdBy: DataTypes.UUID,
    },
    {
        sequelize,
        modelName: 'Location',
        paranoid: true,
    }
);

module.exports = loc;
