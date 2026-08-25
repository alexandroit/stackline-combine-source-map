import { mkdir, readFile, rm, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

const root = new URL('..', import.meta.url);
const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const requiredFiles = [
  'index.js',
  'index.mjs',
  'index.d.ts',
  'index.d.cts',
  'index.d.mts',
  'LICENSE',
  'NOTICE',
  'README.md',
  'SECURITY.md',
  'MIGRATION.md'
];

if (packageJson.name !== '@stackline/combine-source-map') {
  throw new Error('Unexpected package name');
}
if (packageJson.main !== './index.js' || packageJson.types !== './index.d.ts') {
  throw new Error('Package entry points do not match the compatibility contract');
}

for (const file of requiredFiles) {
  await stat(new URL('../' + file, import.meta.url));
}

for (const file of ['index.js', 'lib/mappings-from-map.js']) {
  const syntax = spawnSync(process.execPath, ['--check', file], {
    cwd: root,
    encoding: 'utf8'
  });
  if (syntax.status !== 0) {
    throw new Error(syntax.stderr || syntax.stdout || 'Syntax validation failed');
  }
}

const dist = new URL('../dist', import.meta.url);
await rm(dist, { recursive: true, force: true });
await mkdir(dist);
await build({
  entryPoints: [new URL('../index.js', import.meta.url).pathname],
  outfile: new URL('../dist/browser.cjs', import.meta.url).pathname,
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['es2018'],
  legalComments: 'eof'
});
await build({
  entryPoints: [new URL('../index.mjs', import.meta.url).pathname],
  outfile: new URL('../dist/browser.mjs', import.meta.url).pathname,
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2018'],
  legalComments: 'eof'
});

console.log('Source-first package and browser distribution verified');
