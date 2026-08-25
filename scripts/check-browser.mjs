import { build } from 'esbuild';
import vm from 'node:vm';
import { TextDecoder, TextEncoder } from 'node:util';

const result = await build({
  entryPoints: ['index.js'],
  bundle: true,
  format: 'iife',
  globalName: 'StacklineCombineSourceMap',
  platform: 'browser',
  write: false
});

const context = {
  TextDecoder,
  TextEncoder,
  Uint8Array,
  URL,
  atob: value => Buffer.from(value, 'base64').toString('binary'),
  btoa: value => Buffer.from(value, 'binary').toString('base64')
};
vm.createContext(context);
vm.runInContext(result.outputFiles[0].text, context);
vm.runInContext(`
  var output = StacklineCombineSourceMap.create('browser.js')
    .addFile({ sourceFile: 'input.js', source: 'console.log("Ola, 世界");' })
    .comment();
  if (typeof output !== 'string' || output.indexOf('sourceMappingURL=data:') === -1) {
    throw new Error('browser combination failed');
  }
`, context);
console.log('Browser bundle verified without Buffer');
