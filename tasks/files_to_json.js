/*
 * grunt-files-to-json
 * Please answer the follow
 *
 * Copyright (c) 2014 Allan Hortle
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var fs = require("fs"),
        path = require("path");


    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    

    grunt.registerMultiTask('files_to_json', 'Turns files into json data', function(a, b) {
        var data = {};

        function set(obj, str, val) {
            str = str.split(".");
            while (str.length > 1)
                obj = obj[str.shift()];
            return obj[str.shift()] = val;
        }

        this.files.forEach(function(file) {
            var contents = file.src.filter(function(filepath) {
                if (grunt.file.isFile(filepath)) {
                    return true;
                }
                // console.log(jsoner(depth));                
            }).map(function(filepath) {
                var depth = filepath.split('/');
                console.log("depth: ",depth);
                var file = depth[depth.length -1];
                console.log("file: ",file);
                depth.pop();
                var dot = depth.join('.');
                console.log("dot: ",dot);
                set(data, dot, file);

            });
            
            console.log(data);

            grunt.log.writeln('---');
        });

    });

};
