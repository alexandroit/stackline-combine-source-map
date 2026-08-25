'use strict';

var assert = require('assert');
var combine = require('..');
var convert = require('convert-source-map');
var mappingsFromMap = require('../lib/mappings-from-map');
var tests = [];

function test(name, run) {
  tests.push({ name: name, run: run });
}

function mapComment(map) {
  return convert.fromObject(map).toComment();
}

function decode(combiner) {
  return convert.fromBase64(combiner.base64()).toObject();
}

function simpleMap(overrides) {
  var map = {
    version: 3,
    file: 'input.js',
    sourceRoot: '',
    sources: ['input.ts'],
    names: [],
    mappings: 'AAAA',
    sourcesContent: ['const answer = 42;']
  };
  Object.keys(overrides || {}).forEach(function (key) {
    map[key] = overrides[key];
  });
  return map;
}

test('retains the complete synchronous CommonJS API', function () {
  assert.deepStrictEqual(Object.keys(combine).sort(), ['create', 'removeComments']);
  var combiner = combine.create('bundle.js');
  assert.strictEqual(typeof combiner.addFile, 'function');
  assert.strictEqual(typeof combiner._addGeneratedMap, 'function');
  assert.strictEqual(typeof combiner._addExistingMap, 'function');
  assert.strictEqual(typeof combiner.base64(), 'string');
  assert.strictEqual(typeof combiner.comment(), 'string');
  assert.strictEqual(typeof combiner.base64().then, 'undefined');
  assert.strictEqual(typeof combiner.comment().then, 'undefined');
});

test('generates identity mappings when no inline map is present', function () {
  var source = 'first();\nsecond();\n';
  var map = decode(combine.create('bundle.js').addFile({
    sourceFile: 'src/input.js',
    source: source
  }, { line: 2, column: 4 }));

  assert.deepStrictEqual(map.sources, ['src/input.js']);
  assert.deepStrictEqual(map.sourcesContent, [source]);
  assert.deepStrictEqual(mappingsFromMap(map).map(function (mapping) {
    return mapping.generated;
  }), [
    { line: 3, column: 4 },
    { line: 4, column: 4 },
    { line: 5, column: 4 }
  ]);
});

test('combines an inline map and preserves original positions', function () {
  var original = simpleMap({ mappings: 'AAAA;AACA' });
  var source = 'lineOne();\nlineTwo();\n' + mapComment(original);
  var map = decode(combine.create('bundle.js').addFile({
    sourceFile: 'build/input.js',
    source: source
  }, { line: 3 }));
  var mappings = mappingsFromMap(map);

  assert.deepStrictEqual(map.sources, ['build/input.ts']);
  assert.deepStrictEqual(map.sourcesContent, original.sourcesContent);
  assert.deepStrictEqual(mappings.map(function (mapping) { return mapping.generated; }), [
    { line: 4, column: 0 },
    { line: 5, column: 0 }
  ]);
  assert.deepStrictEqual(mappings.map(function (mapping) { return mapping.original; }), [
    { line: 1, column: 0 },
    { line: 2, column: 0 }
  ]);
});

test('preserves multiple sources when the first content is empty or null', function () {
  var firstEmpty = {
    version: 3,
    sources: ['empty.js', 'full.js'],
    names: [],
    mappings: 'AAAA;ACAA',
    sourcesContent: ['', 'full();']
  };
  var emptyMap = decode(combine.create().addFile({
    sourceFile: 'generated.js',
    source: 'generated();\n' + mapComment(firstEmpty)
  }));
  assert.deepStrictEqual(emptyMap.sources, ['empty.js', 'full.js']);
  assert.deepStrictEqual(emptyMap.sourcesContent, ['', 'full();']);

  var firstNull = simpleMap({
    sources: ['missing.js', 'present.js'],
    mappings: 'AAAA;ACAA',
    sourcesContent: [null, 'present();']
  });
  var nullMap = decode(combine.create().addFile({
    sourceFile: 'generated.js',
    source: 'generated();\n' + mapComment(firstNull)
  }));
  assert.deepStrictEqual(nullMap.sources, ['missing.js', 'present.js']);
  assert.deepStrictEqual(nullMap.sourcesContent, [null, 'present();']);
});

test('accepts null-prototype, shadowed, and frozen offsets without mutation', function () {
  var nullOffset = Object.create(null);
  nullOffset.line = 2;
  var shadowed = { line: 1, hasOwnProperty: null };
  var frozen = Object.freeze({ column: 3 });

  var map = decode(combine.create()
    .addFile({ sourceFile: 'one.js', source: 'one();' }, nullOffset)
    .addFile({ sourceFile: 'two.js', source: 'two();' }, shadowed)
    .addFile({ sourceFile: 'three.js', source: 'three();' }, frozen));

  assert.deepStrictEqual(mappingsFromMap(map).map(function (mapping) {
    return mapping.generated;
  }), [
    { line: 1, column: 3 },
    { line: 2, column: 0 },
    { line: 3, column: 0 }
  ]);
  assert.deepStrictEqual(frozen, { column: 3 });
});

test('keeps dangerous source names as local data', function () {
  var original = {
    version: 3,
    sources: ['__proto__', 'prototype', 'constructor'],
    names: [],
    mappings: 'AAAA;ACAA;ACAA',
    sourcesContent: ['one', 'two', 'three']
  };
  var map = decode(combine.create().addFile({
    sourceFile: 'generated.js',
    source: 'generated();\n' + mapComment(original)
  }));

  assert.deepStrictEqual(map.sources, original.sources);
  assert.deepStrictEqual(map.sourcesContent, original.sourcesContent);
  assert.strictEqual(Object.prototype.polluted, undefined);
  assert.strictEqual(Object.getPrototypeOf({}), Object.prototype);
});

test('rebases POSIX, Windows, UNC, and URL sources portably', function () {
  function sourcesFor(sourceFile, map) {
    return decode(combine.create().addFile({
      sourceFile: sourceFile,
      source: 'generated();\n' + mapComment(map)
    })).sources;
  }

  assert.deepStrictEqual(sourcesFor('gen/bundle.js', simpleMap({
    sourceRoot: '../src',
    sources: ['pkg/input.ts']
  })), ['src/pkg/input.ts']);
  assert.deepStrictEqual(sourcesFor('gen\\bundle.js', simpleMap({
    sourceRoot: '..\\src',
    sources: ['pkg\\input.ts']
  })), ['src/pkg/input.ts']);
  assert.deepStrictEqual(sourcesFor('gen/bundle.js', simpleMap({
    sourceRoot: '',
    sources: ['C:\\src\\input.ts']
  })), ['C:/src/input.ts']);
  assert.deepStrictEqual(sourcesFor('gen/bundle.js', simpleMap({
    sourceRoot: '',
    sources: ['\\\\server\\share\\input.ts']
  })), ['//server/share/input.ts']);
  assert.deepStrictEqual(sourcesFor('gen/bundle.js', simpleMap({
    sourceRoot: '',
    sources: ['HTTPS://CDN.EXAMPLE/input.ts']
  })), ['HTTPS://CDN.EXAMPLE/input.ts']);
});

test('does not duplicate a source path equal to its generated file', function () {
  var map = decode(combine.create().addFile({
    sourceFile: 'a/b/input.js',
    source: 'input();\n' + mapComment(simpleMap({
      file: 'a/b/input.js',
      sources: ['a/b/input.js']
    }))
  }));
  assert.deepStrictEqual(map.sources, ['a/b/input.js']);
});

test('supports indexed section source maps synchronously', function () {
  var indexed = {
    version: 3,
    sections: [
      {
        offset: { line: 0, column: 0 },
        map: simpleMap({ sources: ['one.ts'], sourcesContent: ['one();'] })
      },
      {
        offset: { line: 1, column: 0 },
        map: simpleMap({ sources: ['two.ts'], sourcesContent: ['two();'] })
      }
    ]
  };
  var map = decode(combine.create().addFile({
    sourceFile: 'bundle.js',
    source: 'one();\ntwo();\n' + mapComment(indexed)
  }));
  assert.deepStrictEqual(map.sources, ['one.ts', 'two.ts']);
  assert.deepStrictEqual(map.sourcesContent, ['one();', 'two();']);
});

test('preserves generated-only source map segments', function () {
  var mappings = mappingsFromMap({
    version: 3,
    sources: [],
    names: [],
    mappings: 'A'
  });
  assert.deepStrictEqual(mappings, [{
    original: undefined,
    generated: { line: 1, column: 0 },
    source: undefined,
    name: null
  }]);
});

test('removes inline and external comments without scanning strings', function () {
  var inline = mapComment(simpleMap());
  var source = [
    'var text = ' + JSON.stringify(inline) + ';',
    inline,
    'body {' + convert.generateMapFileComment('style.css.map', { multiline: true }) + '}',
    '//# sourceMappingURL=bundle.js.map'
  ].join('\n');
  assert.strictEqual(combine.removeComments(source), [
    'var text = ' + JSON.stringify(inline) + ';',
    '',
    'body {}',
    ''
  ].join('\n'));
  assert.strictEqual(combine.removeComments(42), 42);
});

test('handles large malformed comment input in linear work', function () {
  var malformed = new Array(300002).join('\n');
  assert.strictEqual(combine.removeComments(malformed), malformed);
});

test('keeps final sourceRoot, file, and Unicode content', function () {
  var source = 'console.log("Ola, 世界");';
  var map = decode(combine.create('dist/bundle.js', '/workspace').addFile({
    sourceFile: 'src/input.js',
    source: source
  }));
  assert.strictEqual(map.file, 'dist/bundle.js');
  assert.strictEqual(map.sourceRoot, '/workspace');
  assert.deepStrictEqual(map.sourcesContent, [source]);
});

async function main() {
  for (var index = 0; index < tests.length; index++) {
    var current = tests[index];
    try {
      await current.run();
      console.log('ok - ' + current.name);
    } catch (error) {
      console.error('not ok - ' + current.name);
      throw error;
    }
  }
  console.log('1..' + tests.length);
}

main().catch(function (error) {
  console.error(error.stack || error);
  process.exitCode = 1;
});
