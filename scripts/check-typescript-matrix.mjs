import { spawnSync } from 'node:child_process';

const versions = ['3.9.10', '4.7.4', '4.9.5', '5.9.3', '6.0.3', '7.0.2'];

for (const version of versions) {
  let result;
  for (let attempt = 0; attempt < 3; attempt++) {
    result = spawnSync(
      'npx',
      ['--yes', '--package', 'typescript@' + version, 'tsc', '-p', 'test/types/tsconfig.json'],
      {
        cwd: new URL('..', import.meta.url).pathname,
        encoding: 'utf8'
      }
    );
    if (!result.error) break;
  }
  if (result.status !== 0) {
    throw result.error || new Error(result.stderr || result.stdout || 'TypeScript ' + version + ' failed');
  }
  console.log('TypeScript ' + version + ' passed');
}
