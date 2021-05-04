const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const config = require('./src/core/config');
const indexRouter = require('./src/http/routes/index');
const responder = require('./src/core/responder');

const db = require('./src/core/models/index');
db.sequelize.sync();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
        origin: ['http://localhost', 'https://henryharr.is'],
    }),
);

app.use('/', indexRouter);

// API routes
const apiRoutes = {
    index: '',
    users: 'users',
    names: 'names',
    auth: 'auth',
    groups: 'groups',
};
for (const [key, route] of Object.entries(apiRoutes)) {
    app.use(`/api/${route}`, require(`./src/http/routes/api/${key}`));
}

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    responder.notFoundResponse(res);
});

// Crror handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    responder.ohShitResponse(res, err.message);
});

module.exports = app;
