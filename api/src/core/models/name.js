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
        console.log("NAME", models);
        // define association here
        this.belongsToMany(models.Group, {
            as: 'groups',
            through: models.GroupNameMembership,
            targetKey: 'groupUuid',
            sourceKey: 'nameUuid',
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

Name.init(
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

module.exports = Name;
