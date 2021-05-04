'use strict';

const { v4: uuidv4 } = require('uuid');
const {
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require('../../core/sequelize');

class Name extends Model {
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

        this.addHook('beforeSave', async (name) => {
            return name.nameUuid = uuidv4();
        });

        return this;
    }
};

const name = Name.init(
    {
        nameUuid: DataTypes.UUID,
        first: DataTypes.STRING,
        last: DataTypes.STRING,
        createdBy: DataTypes.UUID,
    },
    {
        sequelize,
        modelName: 'Name',
        paranoid: true,
    }
);

module.exports = name;
