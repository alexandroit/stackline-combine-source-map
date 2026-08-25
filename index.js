'use strict';

var resolveUri = require('@jridgewell/resolve-uri');
var traceMapping = require('@jridgewell/trace-mapping');
var convert = require('convert-source-map');
var createGenerator = require('inline-source-map');
var mappingsFromMap = require('./lib/mappings-from-map');

var hasOwn = Object.prototype.hasOwnProperty;
var protocolPattern = /^[A-Za-z][A-Za-z0-9+.-]*:/;
var windowsAbsolutePattern = /^[A-Za-z]:\//;

function normalizeSlashes(value) {
  return value.replace(/\\/g, '/');
}

function isAbsoluteReference(value) {
  return value.charAt(0) === '/' ||
    windowsAbsolutePattern.test(value) ||
    protocolPattern.test(value);
}

function rebaseRelativePath(sourceFile, relativePath) {
  if (!relativePath) return relativePath;

  var normalizedPath = normalizeSlashes(relativePath);
  var normalizedSource = normalizeSlashes(sourceFile);

  if (normalizedSource === normalizedPath || isAbsoluteReference(normalizedPath)) {
    return resolveUri(normalizedPath);
  }

  return resolveUri(normalizedPath, normalizedSource);
}

function resolveMap(source) {
  var converter = convert.fromSource(source);
  return converter ? converter.toObject() : null;
}

function createTracer(map) {
  return new traceMapping.AnyMap(map);
}

function hasInlinedSource(tracer) {
  var contents = tracer.sourcesContent;
  if (!contents) return false;

  for (var index = 0; index < contents.length; index++) {
    if (typeof contents[index] === 'string') return true;
  }
  return false;
}

function normalizeOffset(offset) {
  offset = offset || {};
  return {
    line: hasOwn.call(offset, 'line') ? offset.line : 0,
    column: hasOwn.call(offset, 'column') ? offset.column : 0
  };
}

function Combiner(file, sourceRoot) {
  this.generator = createGenerator({
    file: file || 'generated.js',
    sourceRoot: sourceRoot
  });
}

Combiner.prototype._addGeneratedMap = function (sourceFile, source, offset) {
  this.generator.addGeneratedMappings(sourceFile, source, offset);
  this.generator.addSourceContent(sourceFile, source);
  return this;
};

Combiner.prototype._addExistingMap = function (sourceFile, source, existingMap, offset) {
  var tracer = createTracer(existingMap);
  var contents = tracer.sourcesContent;
  var sources = tracer.resolvedSources;

  if (contents) {
    for (var index = 0; index < sources.length; index++) {
      if (typeof contents[index] !== 'string') continue;
      this.generator.addSourceContent(
        rebaseRelativePath(sourceFile, sources[index]),
        contents[index]
      );
    }
  }

  mappingsFromMap(tracer).forEach(function (mapping) {
    this.generator.addMappings(
      rebaseRelativePath(sourceFile, mapping.source),
      [mapping],
      offset
    );
  }, this);

  return this;
};

Combiner.prototype.addFile = function (options, offset) {
  var normalizedOffset = normalizeOffset(offset);
  var existingMap = resolveMap(options.source);

  if (existingMap) {
    var tracer = createTracer(existingMap);
    if (hasInlinedSource(tracer)) {
      return this._addExistingMap(
        options.sourceFile,
        options.source,
        existingMap,
        normalizedOffset
      );
    }
  }

  return this._addGeneratedMap(options.sourceFile, options.source, normalizedOffset);
};

Combiner.prototype.base64 = function () {
  return this.generator.base64Encode();
};

Combiner.prototype.comment = function () {
  return this.generator.inlineMappingUrl();
};

exports.create = function (file, sourceRoot) {
  return new Combiner(file, sourceRoot);
};

exports.removeComments = function (source) {
  if (!source.replace) return source;
  return convert.removeMapFileComments(convert.removeComments(source));
};
