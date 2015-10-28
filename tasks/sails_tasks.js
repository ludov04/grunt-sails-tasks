/*
 * grunt-sails-tasks
 * https://github.com/tobalsgithub/grunt-sails-tasks
 *
 * Copyright (c) 2015 TC
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');
var sails = require('sails');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sails_tasks', 'A grunt command to run 1 off tasks with sails', function() {
    var asyncFn;
    var fns = this.data.functions;
    var done = this.async();

    if (!fns) {
      return grunt.fail.fatal('Missing required field "functions"');
    }

    if (!(fns instanceof Array)) {
      fns = [fns];
    }

    if (this.data.series) {
      asyncFn = async.series;
    } else {
      asyncFn = async.parallel;
    }

    sails.lift({
      port: -1,
      environment: this.options('env') || process.env.NODE_ENV,
      tasks: true
    }, function (err) {

      if (err) {
        grunt.fail.fatal('Could not lift sails', err);
        return done();
      }

      asyncFn(fns, function (err) {
        if (err) {
          grunt.fail.fatal('An error occurred running the input functions', err);
        }

        return done();
      });

    });
  });
};
