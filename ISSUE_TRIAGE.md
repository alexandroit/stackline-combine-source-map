# Issue Triage

## P0: Release Blockers

- Any asynchronous return from `base64()` or `comment()`.
- A prototype side effect from an input-controlled source name.
- Superlinear malformed-comment scanning.
- Packed installs that cannot resolve P1 or P2 from the target registry.
- Failure on the supported Node.js or TypeScript matrix.

## P1: Compatibility and Correctness

- Incorrect generated offsets.
- Loss of embedded source content.
- Incorrect rebasing of POSIX, Windows, UNC, or URI sources.
- CommonJS, ESM, browser, or declaration divergence.
- Indexed map regressions.

## P2: Maintenance

- Documentation improvements.
- Additional real-world fixtures.
- Performance improvements that do not alter output.
- Expanded adoption and integration examples.

## Deferred

- Promise-based output methods.
- External source-map file loading.
- A higher Node.js floor.
- A new source-map format.
