module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('LocationNameRelationships', {
            locationUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: 'Locations', key: 'locationUuid' },
                primaryKey: true,
            },
            nameUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: 'Names', key: 'nameUuid' },
                primaryKey: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('LocationNameRelationships');
    },
};
