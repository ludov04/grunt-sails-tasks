/*
 * grunt-sails-tasks
 * https://github.com/tobalsgithub/grunt-sails-tasks
 *
 * Copyright (c) 2015 TC
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    sails_tasks: {
      seed: {
        functions: [
          function (callback) {
            console.log('one');
            callback();
          },
          function (callback) {
            console.log('two');
            callback();
          }
        ]
      },
      glory: {
        series: true,
        functions: [
          function (cb) {
            console.log('three');
            cb();
          },
          function (cb) {
            console.log('four');
            cb();
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sails_tasks']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
