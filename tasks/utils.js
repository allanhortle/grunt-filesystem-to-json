var utils = {
    setObject: function(name, value, context) {
        var parts = name.split('.');
        var p = parts.pop();
        for (var i=0, j; context && (j=parts[i]); i++){
            context = (j in context ? context[j] : context[j]={});
        }
        return context && p ? (context[p]=value) : undefined; // Object
    },
    requireFromString: function(src, filename) {
        var Module = module.constructor;
        var m = new Module();
        m._compile(src, filename);
        return m.exports;
    }
}

module.exports = utils;