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
        content: '<!-- process_statics filter() --><!-- end_process_statics -->',
        expected: [
          {
            filter: 'filter()',
            content: '',
            rawContent: '<!-- process_statics filter() --><!-- end_process_statics -->'
          }
        ]
      },
      {
        content: '<!-- process_statics first() -->first-block-content<!-- end_process_statics -->' +
          '<!-- process_statics second() -->second-block-content<!-- end_process_statics -->',
        expected: [
          {
            filter: 'first()',
            content: 'first-block-content',
            rawContent: '<!-- process_statics first() -->first-block-content<!-- end_process_statics -->'
          },
          {
            filter: 'second()',
            content: 'second-block-content',
            rawContent: '<!-- process_statics second() -->second-block-content<!-- end_process_statics -->'
          }
        ]
      }
    ];

    testData.forEach(function (data) {
      assert.deepEqual(extractor.extractBlocks(data.content), data.expected);
    });
  });

  it('should not match block without filter definition', function () {
    var content = '<!-- process_statics -->block with missing filter<!-- end_process_statics -->';

    assert.deepEqual(extractor.extractBlocks(content), []);
  });
});
