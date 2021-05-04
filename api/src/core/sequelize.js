const { Sequelize } = require('sequelize');
const config = require('./config.js');

// Database initialization
const host = config.get('database.host');
const database = config.get('database.database');
const username = config.get('database.username');
const password = config.get('database.password');
const dialect = config.get('database.dialect');
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
});

const { ErrorConnectingToDatabaseError } = require('./errors');

async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw new ErrorConnectingToDatabaseError();
    }
}

module.exports = sequelize;
