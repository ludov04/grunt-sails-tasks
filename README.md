# grunt-sails-tasks

> A grunt command to run 1 off tasks with sails

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sails-tasks --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sails-tasks');
```

## The "sails_tasks" task

### Overview
In your project's Gruntfile, add a section named `sails_tasks` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sails_tasks: {
    your_target: {
      functions: [ functionOne, functionTwo ]
    },
  },
});
```

### Data

#### data.functions
Type: `Array of functions`
Required

An array of functions to execute. The functions are executed using the (async)[https://github.com/caolan/async] framework, so each function should take one parameter that is a callback function.

```js
functions: [
  function (callback) {
    // do something
    callback();
  },
  function (callback) {
    // do something else
    callback();
  }
]

```

#### data.series
Type: `Boolean`
Default value: `false`

If `true`, `async.series` will be used to execute the functions. The default is `false`, in which case `async.parallel` will be used.

### Usage Examples

#### Default Options
We use this grunt task to do a number of things on each deployment. One of the things we do is seed data into the database. There are a number of repos out there that deal with seeding data for sails, but we needed slightly more flexibility, and opted to write our own code to seed the data.

```js
grunt.initConfig({
  sails_tasks: {
    seed: {
      functions: [
        function (callback) {
          // Seed some config data
          callback();
        },
        function (callback) {
          // Seed some example data
          callback();
        }
      ]
    }
  }
});
```

This task will run this code like below, after lifting sails.

```js
async.parallel([
  function (callback) {
    // Seed some config data
    callback();
  },
  function (callback) {
    // Seed some example data
    callback();
  }
], cb);
```

#### Series
In some cases, you may want to run your functions in series, rather than in parallel. Note that it's nearly as easy to just create one function for the `sails_tasks` functions array that then calls the functions in series. This just removes the need to nest that one extra level.

```js
grunt.initConfig({
  sails_tasks: {
    options: {
      series: true
    },
    seed: {
      functions: [
        function (callback) {
          // Seed some config data
          callback();
        },
        function (callback) {
          // Seed some example data
          callback();
        }
      ]
    }
  }
});
```

This task will run this code like below, after lifting sails.

```js
async.series([
  function (callback) {
    // Seed some config data
    callback();
  },
  function (callback) {
    // Seed some example data
    callback();
  }
], cb);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
