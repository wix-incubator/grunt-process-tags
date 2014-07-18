'use strict';

var assert = require('assert');
var grunt = require('grunt');

grunt.task.init([]);
grunt.config.init({});

describe('processTags', function () {
  it('should work with defaults', function () {
    grunt.log.muted = true;

    grunt.config.init();
    grunt.config('processTags', {
      defaultOptions: {
        options: {
        },
        files: [
          {
            'tmp/default-options.html': 'test/fixtures/default-options.html'
          }
        ]
      }
    });
    grunt.task.run('processTags');
    grunt.task.start();

    assert.equal(
      grunt.file.read('tmp/default-options.html'),
      grunt.file.read('test/expected/default-options.html')
    );
  });

  it('should work with custom processors', function () {
    grunt.log.muted = true;

    grunt.config.init();
    grunt.config('processTags', {
      customProcessors: {
        options: {
          processors: {
            asFn: function () {
              return 'result';
            },
            asFactoryFn: function () {
              var result = Array.prototype.slice.call(arguments).join(', ');
              return function () {
                return result;
              };
            }
          }
        },
        files: [
          {
            'tmp/custom-processors.html': 'test/fixtures/custom-processors.html'
          }
        ]
      }
    });
    grunt.task.run('processTags');
    grunt.task.start();

    assert.equal(
      grunt.file.read('tmp/custom-processors.html'),
      grunt.file.read('test/expected/custom-processors.html')
    );
  });

  it('should work with custom patterns', function () {
    grunt.log.muted = true;

    grunt.config.init();
    grunt.config('processTags', {
      default_options: {
        options: {
          patterns: [
            [
              /<a[^>]+>(.+)<\/a>/gm,
              "Matches links text"
            ]
          ]
        },
        files: [
          {
            'tmp/custom-patterns.html': 'test/fixtures/custom-patterns.html'
          }
        ]
      }
    });
    grunt.task.run('processTags');
    grunt.task.start();

    assert.equal(
      grunt.file.read('tmp/custom-patterns.html'),
      grunt.file.read('test/expected/custom-patterns.html')
    );
  });
});
