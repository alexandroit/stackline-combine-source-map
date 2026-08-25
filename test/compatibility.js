'use strict';

var assert = require('assert');
var upstream = require('combine-source-map');
var stackline = require('..');
var convert = require('convert-source-map');

function inline(map) {
  return convert.fromObject(map).toComment();
}

function output(implementation, files, file, sourceRoot) {
  var combiner = implementation.create(file, sourceRoot);
  files.forEach(function (entry) {
    combiner.addFile({ sourceFile: entry.sourceFile, source: entry.source }, entry.offset);
  });
  return convert.fromBase64(combiner.base64()).toObject();
}

var map = {
  version: 3,
  file: 'compiled.js',
  sourceRoot: '../src',
  sources: ['one.ts', 'two.ts'],
  names: [],
  mappings: 'AAAA;ACAA',
  sourcesContent: ['one();', 'two();']
};

var scenarios = [
  {
    name: 'generated identity mappings',
    files: [{ sourceFile: 'src/plain.js', source: 'one();\ntwo();' }]
  },
  {
    name: 'single inline map',
    files: [{ sourceFile: 'gen/compiled.js', source: 'one();\ntwo();\n' + inline(map), offset: { line: 3 } }]
  },
  {
    name: 'multiple files and offsets',
    files: [
      { sourceFile: 'gen/one.js', source: 'one();\n' + inline({
        version: 3,
        sources: ['one.ts'],
        names: [],
        mappings: 'AAAA',
        sourcesContent: ['one();']
      }) },
      { sourceFile: 'gen/two.js', source: 'two();\n' + inline({
        version: 3,
        sources: ['two.ts'],
        names: [],
        mappings: 'AAAA',
        sourcesContent: ['two();']
      }), offset: { line: 1, column: 2 } }
    ],
    file: 'bundle.js'
  },
  {
    name: 'same source and generated filename',
    files: [{ sourceFile: 'a/b/input.js', source: 'input();\n' + inline({
      version: 3,
      sources: ['a/b/input.js'],
      names: [],
      mappings: 'AAAA',
      sourcesContent: ['input();']
    }) }],
    sourceRoot: '/project'
  }
];

scenarios.forEach(function (scenario) {
  assert.deepStrictEqual(
    output(stackline, scenario.files, scenario.file, scenario.sourceRoot),
    output(upstream, scenario.files, scenario.file, scenario.sourceRoot),
    scenario.name
  );
  console.log('ok - differential: ' + scenario.name);
});

var inlineComment = inline(map);
var mixed = 'code\n' + inlineComment + '\n//# sourceMappingURL=file.js.map';
assert.strictEqual(stackline.removeComments(mixed), upstream.removeComments(mixed));
console.log('ok - differential: comment removal');
console.log('1..' + (scenarios.length + 1));
