var filter = function(array, prop, val) {
    return array.filter(function(element) {
        return element[prop] === val;
    });
};

module.exports = {
    findprop: function(array, propname, propvalue, propname2, propvalue2) {
        var result1 = filter(array, propname, propvalue);
        if(propname2) {
            var result2 = filter(result1, propname2, propvalue2);
            return result2[0];
        } else {
            return result1[0];
        }
    }
};
