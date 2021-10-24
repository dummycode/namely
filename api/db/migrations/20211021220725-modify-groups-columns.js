module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Groups', 'title', 'name');
        await queryInterface.changeColumn('Groups', 'name', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Groups', 'name', 'title');
    },
};
