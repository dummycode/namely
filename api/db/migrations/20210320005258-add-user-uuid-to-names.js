'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Names', 'createdBy', {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'Users', key: 'userUuid' }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Names', 'createdBy');
    }
};
