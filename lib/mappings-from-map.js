'use strict';

var traceMapping = require('@jridgewell/trace-mapping');

module.exports = function mappingsFromMap(map) {
  var tracer = map instanceof traceMapping.TraceMap ? map : new traceMapping.AnyMap(map);
  var mappings = [];

  traceMapping.eachMapping(tracer, function (mapping) {
    var hasOriginal = typeof mapping.originalColumn === 'number';
    mappings.push({
      original: hasOriginal ? {
        column: mapping.originalColumn,
        line: mapping.originalLine
      } : undefined,
      generated: {
        column: mapping.generatedColumn,
        line: mapping.generatedLine
      },
      source: hasOriginal ? mapping.source : undefined,
      name: mapping.name
    });
  });

  return mappings;
};
