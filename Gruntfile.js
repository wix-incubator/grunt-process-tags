'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      grunt: {
        src: ['Gruntfile.js']
      },
      core: {
        src: ['lib/**/*.js', 'tasks/*.js']
      },
      test: {
        src: ['test/**/*.js', '!test/fixtures/*.js']
      }
    },

    clean: {
      tests: ['tmp']
    },

    mochacli: {
      all: ['test/test-*.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['clean', 'jshint', 'mochacli']);
  grunt.registerTask('test', 'default');
};
