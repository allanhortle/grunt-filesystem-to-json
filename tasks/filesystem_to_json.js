/*
 * grunt-files-to-json
 *
 * Copyright (c) 2014 Allan Hortle
 * Licensed under the MIT license.
 */

'use strict';

var Utils = require('./utils');
var Parse = require('./parse');
var _ = require('lodash');



var defaultOptions = {
    parser: 'yaml',
    flatten: false
}

module.exports = function (grunt) {    

    grunt.registerMultiTask('filesystem_to_json', 'Turns files into json data', function (a, b) {
        var data = {};

        var options = _.defaults(this.options(), defaultOptions);

        this.files.forEach(function(file) {
            var contents = file.src.filter(function(filepath) {
                if (grunt.file.isFile(filepath)) {
                    return true;
                }       
            }).map(function(filepath) {
                var index = filepath.lastIndexOf("/");
                var fileName = filepath.substr(index + 1);
                var path = filepath.split('/').join('.');
                path = path.substr(0, path.lastIndexOf("."));

                try {
                    Utils.setObject(path, Parse.file(options.parser, filepath), data);
                    grunt.log.ok(filepath);
                } catch(e) {
                    grunt.log.error(filepath);
                    grunt.fail.warn(e);
                }

                
            });

            grunt.file.write(file.dest, JSON.stringify(data));
        });


    });

};
