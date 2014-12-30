var frontMatter = require('yaml-front-matter');
var grunt = require('grunt');

var parse = {
    file: function (parser, filepath) {
        try {
            return this[parser](filepath);            
        } catch(e) {
            grunt.fail.fatal('\''+parser + '\' is not a specified parser');
        }
    },
    yaml: function (filepath) {
        return frontMatter.loadFront(filepath)
    },
    jsx: function (filepath) {
        console.log(grunt.file.read(filepath));
        return filepath;
    }
}


module.exports = parse;