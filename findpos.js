var sourceMap = require('source-map');
var fs = require('fs');

var sourcemap = JSON.parse(fs.readFileSync('build/main.jsbundle.map', 'utf8'));

var smc = new sourceMap.SourceMapConsumer(sourcemap);

console.log(smc.originalPositionFor({
  line: 366,
  column: 1373
}));