'use strict';

const {
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require('../../core/sequelize');

class LocationNameRelationship extends Model {
    static associate(models) {}

    static init(fields, sequelize) {
        super.init(fields, sequelize);

        this.removeAttribute('id');

        return this;
    }
};

const locationNameRelationship = LocationNameRelationship.init(
    {
        locationUuid: DataTypes.UUID,
        nameUuid: DataTypes.UUID,
        createdBy: DataTypes.UUID,
    },
    {
        sequelize,
        modelName: 'LocationNameRelationship',
        paranoid: true,
    }
);

module.exports = locationNameRelationship;

