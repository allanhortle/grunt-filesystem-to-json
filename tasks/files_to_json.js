/*
 * grunt-files-to-json
 *
 * Copyright (c) 2014 Allan Hortle
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var frontMatter = require('yaml-front-matter');

    grunt.registerMultiTask('files_to_json', 'Turns files into json data', function (a, b) {
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
                var content = frontMatter.loadFront(filepath);
                var path = filepath.split('/').join('.');
                path = path.substr(0, path.lastIndexOf("."));
                setObject(path, content, data);
            });
            console.log(file.dest);
            grunt.file.write(file.dest, JSON.stringify(data));            
        });


    });

};
