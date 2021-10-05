module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('GroupNameMemberships', {
            groupUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: 'Groups', key: 'groupUuid' },
                primaryKey: true,
            },
            nameUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: 'Names', key: 'nameUuid' },
                primaryKey: true,
            },
            addedBy: {
                type: Sequelize.UUID,
                allowNull: false,
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
        await queryInterface.dropTable('GroupNameMemberships');
    },
};

