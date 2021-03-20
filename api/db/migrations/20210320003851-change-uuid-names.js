module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Users', 'uuid', 'userUuid');
        await queryInterface.renameColumn('Names', 'uuid', 'nameUuid');
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Users', 'userUuid', 'uuid');
        await queryInterface.renameColumn('Names', 'nameUuid', 'uuid');
    },
};
