module.exports = {
    up: async (queryInterface) => {
        await queryInterface.renameColumn('Names', 'first', 'name');
        await queryInterface.dropColumn('Names', 'last');
    },
    down: async (queryInterface) => {
        await queryInterface.renameColumn('Names', 'name', 'first');
    },
};
