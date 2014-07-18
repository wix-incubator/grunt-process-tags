'use strict';

module.exports = function (grunt) {
  var url = require('url');
  var BlockExtractor = require('../lib/blockextractor');
  var FilterProcessor = require('../lib/filterprocessor');

  grunt.registerMultiTask('processTags', 'Task to process HTML tags.', function () {
    var options = this.options({
      processors: {
      },
      patterns: [
        [
          /<script.+src=['"]([^"']+)["']/gm,
          'Update the HTML with processed script files'
        ],
        [
          /<link[^\>]+href=['"]([^"']+)["']/gm,
          'Update the HTML with processed css file names'
        ]
      ]
    });

    options.processors.prefix = options.processors.prefix || function (prefix) {
      return function (string) {
        string = string + '';
        if (string.indexOf(prefix) === 0) {
          return string;
        }
        if (url.parse(string).protocol) {
          return string;
        }
        return prefix + string;
      };
    };

    var extractor = new BlockExtractor(),
      processor = new FilterProcessor(options.processors, options.patterns);

    this.files.forEach(function (file) {
      file.src.filter(function (filename) {
        if (!grunt.file.exists(filename)) {
          grunt.log.warn('Source file "' + filename + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function (filename) {
        grunt.log.writeln('Processing file "' + filename + '"');

        var content = grunt.file.read(filename);
        extractor.extractBlocks(content).forEach(function (block) {
          content = content.replace(block.rawContent, processor.process(block.filter, block.content.trim()));
        });
        grunt.file.write(file.dest, content);
      });
    });
  });
};
