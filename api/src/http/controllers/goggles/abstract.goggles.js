module.exports = (object, filter) => {
    let filtered = {}
    for (const key in object) {
        if (filter.includes(key)) {
            filtered[key] = object[key]
        }
    }
    return filtered
}
