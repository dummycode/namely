module.exports.validationError = (field, message) => ({
    field,
    message,
});

module.exports.logError = (...args) => {
    console.log(args); // eslint-disable-line no-console
};
