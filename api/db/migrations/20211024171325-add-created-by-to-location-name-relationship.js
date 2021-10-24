module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('LocationNameRelationships', 'createdBy', {
            type: Sequelize.UUID,
            allowNull: false,
            after: 'nameUuid',
            references: { model: 'Users', key: 'userUuid' },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('LocationNameRelationships', 'createdBy');
    },
};
