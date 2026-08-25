import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || command + ' failed');
  return result.stdout;
}

const root = new URL('..', import.meta.url).pathname;
const registry = process.env.STACKLINE_REGISTRY || 'http://127.0.0.1:4873';
const workspace = await mkdtemp(join(tmpdir(), 'stackline-combine-source-map-'));
const artifact = join(workspace, 'artifact');
const direct = join(workspace, 'direct');
const replacement = join(workspace, 'replacement');
await mkdir(artifact);
await mkdir(direct);
await mkdir(replacement);

const packOutput = run('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', artifact], root);
const filename = JSON.parse(packOutput)[0].filename;
const tarball = join(artifact, filename);

await writeFile(join(direct, 'package.json'), JSON.stringify({ private: true }, null, 2));
run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--registry', registry, tarball], direct);
await writeFile(join(direct, 'commonjs.cjs'), [
  "const combine = require('@stackline/combine-source-map');",
  "const result = combine.create().addFile({ sourceFile: 'x.js', source: 'x();' }).base64();",
  "if (typeof result !== 'string') throw new Error('CommonJS smoke failed');"
].join('\n'));
await writeFile(join(direct, 'module.mjs'), [
  "import combine, { create } from '@stackline/combine-source-map';",
  "if (typeof combine.create().base64() !== 'string') throw new Error('ESM default smoke failed');",
  "if (typeof create().comment() !== 'string') throw new Error('ESM named smoke failed');"
].join('\n'));
run(process.execPath, ['commonjs.cjs'], direct);
run(process.execPath, ['module.mjs'], direct);

await writeFile(join(replacement, 'package.json'), JSON.stringify({
  private: true,
  dependencies: { 'combine-source-map': 'file:' + tarball }
}, null, 2));
run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--registry', registry], replacement);
await writeFile(join(replacement, 'replacement.cjs'), [
  "const combine = require('combine-source-map');",
  "if (typeof combine.create().comment() !== 'string') throw new Error('replacement smoke failed');"
].join('\n'));
run(process.execPath, ['replacement.cjs'], replacement);

const installed = JSON.parse(await readFile(join(direct, 'node_modules/@stackline/combine-source-map/package.json'), 'utf8'));
if (installed.name !== '@stackline/combine-source-map') throw new Error('Wrong installed package');
console.log('Packed CommonJS, ESM, and replacement-name installs verified');
