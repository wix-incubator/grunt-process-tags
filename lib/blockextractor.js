module.exports = function () {
  var pattern = /<!-- process-tags (.*?) -->([.\s\S]*?)<!-- end-process-tags -->/gmi;
  this.extractBlocks = function (content) {
    var result = [], matches;
    while (matches = pattern.exec(content)) {
      result.push({
        filter: matches[1],
        content: matches[2],
        rawContent: matches[0]
      });
    }
    return result;
  };
};
