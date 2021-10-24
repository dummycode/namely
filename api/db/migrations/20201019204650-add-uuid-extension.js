module.exports = {
    up: async (queryInterface) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'),
    down: async () => {},
};
