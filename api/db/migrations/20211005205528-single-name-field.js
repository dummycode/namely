module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Names', 'first', 'name');
        await queryInterface.removeColumn('Names', 'last');
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Names', 'name', 'first');
    },
};
