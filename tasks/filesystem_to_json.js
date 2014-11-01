/*
 * grunt-files-to-json
 *
 * Copyright (c) 2014 Allan Hortle
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var frontMatter = require('yaml-front-matter');

    grunt.registerMultiTask('filesystem_to_json', 'Turns files into json data', function (a, b) {
        var data = {};

        var options = this.options();

        function setObject(name, value, context) {
            var parts = name.split("."),
                p = parts.pop();
            for (var i=0, j; context && (j=parts[i]); i++){
                context = (j in context ? context[j] : context[j]={});
            }
            return context && p ? (context[p]=value) : undefined; // Object
        }

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
                    setObject(path, frontMatter.loadFront(filepath), data);
                    grunt.verbose.ok(filepath);
                } catch(e) {
                    grunt.log.error(filepath);
                    grunt.fail.warn(e);
                }

                
            });
            // this is a test
            console.log(data);
            grunt.file.write(file.dest, JSON.stringify(data));            
        });


    });

};
