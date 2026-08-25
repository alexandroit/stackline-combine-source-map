import { spawnSync } from 'node:child_process';

const versions = ['12', '14', '16', '18', '20', '22', '24'];

for (const version of versions) {
  let result;
  for (let attempt = 0; attempt < 3; attempt++) {
    result = spawnSync('npx', ['--yes', 'node@' + version, 'test/run.js'], {
      cwd: new URL('..', import.meta.url).pathname,
      encoding: 'utf8'
    });
    if (!result.error) break;
  }
  if (result.status !== 0) {
    throw result.error || new Error(result.stderr || result.stdout || 'Node ' + version + ' failed');
  }
  console.log('Node ' + version + ' passed');
}
