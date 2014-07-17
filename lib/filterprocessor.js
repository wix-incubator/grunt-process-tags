module.exports = function (processors, patterns, log) {
  log = log || function () {};
  this.process = function (filterTemplate, content) {
    var filter = eval('processors.' + filterTemplate + ';'); // jshint ignore:line
    patterns.forEach(function (pattern) {
      log(pattern[1]);

      var matches;
      while (matches = pattern[0].exec(content)) {
        content = content.replace(matches[0], matches[0].replace(matches[1], filter(matches[1])));
      }
    });
    return content;
  };
};
