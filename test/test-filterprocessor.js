'use strict';

var assert = require('assert');
var sinon = require('sinon');
var FilterProcessor = require('../lib/filterprocessor');

describe('FilterProcessor', function () {
  var processor, log;

  beforeEach(function () {
    processor = new FilterProcessor(
      {
        asFn: function (string) {
          return string;
        },
        asFactoryFn: function (text) {
          return function () {
            return text;
          };
        }
      },
      [
        [
          /(.+)/gm,
          'Matches everything'
        ]
      ],
      log = sinon.stub()
    );
  });

  it('should use existing filter', function () {
    assert.equal(processor.process('asFn', 'string to process'), 'string to process');
    assert.equal(processor.process('asFactoryFn("result")', 'string to process'), 'result');
  });

  it('should raise an error on non existing filter', function () {
    assert.throws(
      function () {
        processor.process('nonExistingFn', 'content');
      },
      Error
    );
  });

  it('should use provided log method', function () {
    processor.process('asFn', 'test');

    assert(log.called);
  });
});
