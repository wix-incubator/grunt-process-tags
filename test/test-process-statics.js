'use strict';

var assert = require('assert');
var grunt = require('grunt');

grunt.task.init([]);
grunt.config.init({});

describe('process-statics', function () {
  it('should work with defaults', function () {
    grunt.log.muted = true;

    grunt.config.init();
    grunt.config('process_statics', {
      default_options: {
        options: {
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/',
            src: ['*'],
            dest: 'tmp/'
          }
        ]
      }
    });
    grunt.task.run('process_statics');
    grunt.task.start();

    assert.equal(
      grunt.file.read('tmp/default_options.html'),
      grunt.file.read('test/expected/default_options.html')
    );
  });
});
