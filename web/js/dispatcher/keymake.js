module.exports = function(module, obj) {
    var result = {};
    var key;
    for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        result[key] = module + '-' + key;
    }
    return result;
};
