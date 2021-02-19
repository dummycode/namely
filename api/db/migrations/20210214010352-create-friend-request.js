module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('FriendRequests', {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true,
            },
            from: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'uuid',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            to: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'uuid',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            acceptedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            declinedAt: {
                type: Sequelize.DATE,
                allowNull: true,
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
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('FriendRequests');
    },
};
