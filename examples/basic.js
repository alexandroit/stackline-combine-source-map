'use strict';

var combine = require('..');

var combiner = combine.create('bundle.js');
combiner
  .addFile({ sourceFile: 'one.js', source: 'console.log(1);' })
  .addFile({ sourceFile: 'two.js', source: 'console.log(2);' }, { line: 1 });

var comment = combiner.comment();
if (comment.indexOf('//# sourceMappingURL=data:') !== 0) {
  throw new Error('Expected an inline source map comment');
}
console.log('Combined two source files');
