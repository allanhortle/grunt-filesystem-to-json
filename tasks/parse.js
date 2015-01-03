var frontMatter = require('yaml-front-matter');
var reactTools = require('react-tools');
var utils = require('./utils');

var grunt = require('grunt');
var React = require('react')

var parse = {
    file: function (parser, filepath) {
        try {
            return this[parser](filepath);            
        } catch(e) {
            grunt.verbose.warn(e);
            grunt.fail.fatal('\''+parser + '\' is not a specified parser');
        }
    },
    yaml: function (filepath) {
        return frontMatter.loadFront(filepath)
    },
    jsx: function (filepath) {
        var file = grunt.file.read(filepath);
        var regexPattern = /([a-zA-Z]*):[\s']*([a-zA-Z\.]*)/g;
        // var  = reactTools.transform();
        console.log(regexPattern.exec(file))
        return file;
    }
}


module.exports = parse;