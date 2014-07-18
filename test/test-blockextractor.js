'use strict';

var assert = require('assert');
var BlockExtractor = require('../lib/blockextractor');

describe('BlockExtractor', function () {
  var extractor;

  beforeEach(function () {
    extractor = new BlockExtractor();
  });

  it('should extract all defined blocks', function () {
    var testData = [
      {
        content: '',
        expected: []
      },
      {
        content: '<!-- process-tags filter() --><!-- end-process-tags -->',
        expected: [
          {
            filter: 'filter()',
            content: '',
            rawContent: '<!-- process-tags filter() --><!-- end-process-tags -->'
          }
        ]
      },
      {
        content: '<!-- process-tags first() -->first-block-content<!-- end-process-tags -->' +
          '<!-- process-tags second() -->second-block-content<!-- end-process-tags -->',
        expected: [
          {
            filter: 'first()',
            content: 'first-block-content',
            rawContent: '<!-- process-tags first() -->first-block-content<!-- end-process-tags -->'
          },
          {
            filter: 'second()',
            content: 'second-block-content',
            rawContent: '<!-- process-tags second() -->second-block-content<!-- end-process-tags -->'
          }
        ]
      }
    ];

    testData.forEach(function (data) {
      assert.deepEqual(extractor.extractBlocks(data.content), data.expected);
    });
  });

  it('should not match block without filter definition', function () {
    var content = '<!-- process-tags -->block with missing filter<!-- end-process-tags -->';

    assert.deepEqual(extractor.extractBlocks(content), []);
  });
});
