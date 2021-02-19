const json = require('../../config.json');

const get = (path) => {
    let jsonData = json;

    if (typeof path === 'undefined') {
        throw Error('invalid argument');
    }

    let parsedPath = path.replace(/\[(\w+)\]/g, '.$1'); // Convert indices to properties
    parsedPath = parsedPath.replace(/^\./, ''); // Strip a leading dot
    const pathArray = parsedPath.split('.');

    for (let i = 0, n = pathArray.length; i < n; i += 1) {
        const key = pathArray[i];
        if (key in jsonData) {
            if (jsonData[key] !== null) {
                jsonData = jsonData[key];
            } else {
                return null;
            }
        } else {
            return key;
        }
    }

    return jsonData;
};

module.exports = {
    get,
};
