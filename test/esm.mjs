import combine, { create, removeComments } from '../index.mjs';

const direct = create().addFile({ sourceFile: 'esm.js', source: 'export default 1;' });
if (typeof direct.base64() !== 'string') throw new Error('named ESM create failed');
if (typeof combine.create().comment() !== 'string') throw new Error('default ESM export failed');
if (removeComments('plain') !== 'plain') throw new Error('named ESM removeComments failed');
console.log('ESM exports verified');
