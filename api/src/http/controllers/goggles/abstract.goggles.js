const filter = (object, allowList) => {
    const filtered = {};

    Object.keys(object).forEach((key) => {
        if (allowList.includes(key)) {
            filtered[key] = object[key];
        }
    });

    return filtered;
};

const filterModel = (object, allowList) => filter(object.get({ plain: true }), allowList);

module.exports = {
    filter,
    filterModel,
};
