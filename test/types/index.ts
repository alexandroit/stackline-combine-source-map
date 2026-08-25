import combine = require('../..');

const offset: combine.Offset = { line: 2, column: 3 };
const options: combine.FileOptions = {
  sourceFile: 'input.ts',
  source: 'const value: number = 1;'
};
const combiner: combine = combine.create('bundle.js', '/src');
const chained: combine = combiner.addFile(options, offset);
const base64: string = chained.base64();
const comment: string = chained.comment();
const clean: string = combine.removeComments(comment);

void base64;
void clean;
