# @stackline/combine-source-map

> Maintained combine-source-map-compatible combiner with synchronous APIs, modern mappings, and defensive parsing

[![npm version](https://img.shields.io/npm/v/@stackline/combine-source-map.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/combine-source-map)
[![license](https://img.shields.io/npm/l/@stackline/combine-source-map.svg?style=flat-square)](https://github.com/alexandroit/stackline-combine-source-map/blob/main/LICENSE)
[![GitHub repository](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-combine-source-map)

**[Documentation](https://alexandro.net/docs/vanilla/combine-source-map/)** |
**[npm](https://www.npmjs.com/package/@stackline/combine-source-map)** |
**[Issues](https://github.com/alexandroit/stackline-combine-source-map/issues)** |
**[Repository](https://github.com/alexandroit/stackline-combine-source-map)**

**Package version:** `1.0.3`

## Why this package?

> A maintained, typed, `combine-source-map`-compatible combiner for modern
> Node.js and browser build pipelines.




A maintained, synchronous, drop-in-compatible continuation of
[`combine-source-map`](https://www.npmjs.com/package/combine-source-map).

It combines generated files and their inline source maps into one map while
preserving the established CommonJS API:

- `create(file?, sourceRoot?)`
- `combiner.addFile(options, offset?)`
- `combiner.base64()`
- `combiner.comment()`
- `removeComments(source)`

<a id="why-this-package"></a>

### Why this package

The upstream `combine-source-map@0.8.0` release dates from 2017 and depends on
older source-map helpers. This package keeps the familiar synchronous contract
while modernizing map traversal, comment parsing, path handling, typings,
browser packaging, and release verification.

Key properties:

- synchronous `base64()` and `comment()` return values;
- CommonJS and native ESM entry points;
- TypeScript declarations compatible with TypeScript 3.9 and newer;
- Node.js 12 through current releases;
- POSIX, Windows drive, UNC, and URI source paths;
- linear-time source-map comment discovery inherited from
  `@stackline/convert-source-map`;
- safe handling of source names such as `__proto__`, `prototype`, and
  `constructor`;
- no global memoization cache.

<a id="trust-and-maintenance"></a>

### Trust and maintenance

- Every release is built from the public repository.
- CI validates runtime compatibility, types, package exports, clean installs,
  dependency signatures, and bounded malformed-input behavior.
- Security reports use the private process in [SECURITY.md](https://github.com/alexandroit/stackline-combine-source-map/blob/main/SECURITY.md).
- Original MIT attribution remains in [LICENSE](https://github.com/alexandroit/stackline-combine-source-map/blob/main/LICENSE), [NOTICE](https://github.com/alexandroit/stackline-combine-source-map/blob/main/NOTICE), and
  [THIRD_PARTY_LICENSES.md](https://github.com/alexandroit/stackline-combine-source-map/blob/main/THIRD_PARTY_LICENSES.md).

<a id="project-origin"></a>

### Project origin

This is an independent continuation and is not affiliated with the original
maintainers. It preserves the upstream MIT license and attribution. See
[NOTICE](https://github.com/alexandroit/stackline-combine-source-map/blob/main/NOTICE) and [THIRD_PARTY_LICENSES.md](https://github.com/alexandroit/stackline-combine-source-map/blob/main/THIRD_PARTY_LICENSES.md).

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/combine-source-map@1.0.3` |
| Node.js runtime | `>=12` |
| CommonJS / primary entry | `./index.js` |
| Type declarations | `./index.d.ts` |

<a id="compatibility-at-a-glance"></a>

### Compatibility at a glance

| Item | Value |
| :--- | :--- |
| Package | `@stackline/combine-source-map@1.0.3` |
| API baseline | `combine-source-map@0.8.0` |
| Runtime | Node.js 12+, browser bundles |
| Modules | CommonJS and native ESM |
| Types | First-party TypeScript declarations |
| Runtime dependencies | Four, including two Stackline compatibility aliases |

The normal behavior of `combine-source-map@0.8.0` is covered by differential
tests. Intentional corrections are listed in
[COMPATIBILITY_CONTRACT.md](https://github.com/alexandroit/stackline-combine-source-map/blob/main/COMPATIBILITY_CONTRACT.md), and migration options
are in [MIGRATION.md](https://github.com/alexandroit/stackline-combine-source-map/blob/main/MIGRATION.md).

## Installation

<a id="install"></a>

### Install

Use the scoped package directly:

## Usage

```sh
npm install @stackline/combine-source-map
```

```js
const combine = require('@stackline/combine-source-map');
```

For an existing project that imports `combine-source-map`, use an npm alias:

```sh
npm install combine-source-map@npm:@stackline/combine-source-map
```

Existing source code can remain unchanged:

```js
const combine = require('combine-source-map');
```

```js
const combine = require('@stackline/combine-source-map');

const combiner = combine.create('bundle.js');

combiner
  .addFile({
    sourceFile: 'src/one.js',
    source: 'console.log(1);'
  })
  .addFile({
    sourceFile: 'src/two.js',
    source: 'console.log(2);'
  }, { line: 1 });

const base64 = combiner.base64();
const comment = combiner.comment();
```

Native ESM is also supported:

```js
import combine, { create, removeComments } from '@stackline/combine-source-map';

const map = create('bundle.js')
  .addFile({ sourceFile: 'input.js', source: 'export default 1;' })
  .comment();
```

## Security

Security hardening is tested against dangerous property names and large,
malformed comment input. No CVE or GHSA is claimed for this package without a
matching public advisory. Report suspected vulnerabilities privately as
described in [SECURITY.md](https://github.com/alexandroit/stackline-combine-source-map/blob/main/SECURITY.md).

## API Surface

<a id="api"></a>

### API

#### `create(file?, sourceRoot?)`

Creates a combiner. `file` defaults to `generated.js`.

#### `combiner.addFile(options, offset?)`

Adds a generated source file. `options` contains `sourceFile` and `source`.
When `source` includes an inline map with embedded source content, its original
mappings are rebased and retained. Otherwise, identity mappings are generated.

`offset.line` and `offset.column` default to zero.

#### `combiner.base64()`

Returns the combined source map as a base64 string. The return value is always
synchronous.

#### `combiner.comment()`

Returns an inline `sourceMappingURL` comment. The return value is always
synchronous.

#### `removeComments(source)`

Removes inline and external source-map comments while leaving comment-like text
inside JavaScript strings untouched.

## Local Development

```sh
git clone https://github.com/alexandroit/stackline-combine-source-map.git
cd stackline-combine-source-map
npm ci
npm run test
```

Release tooling uses Node.js 24.20.0 and npm 11.19.0. The consumer runtime contract remains the one documented above.

## Consumer Smoke Test

Run the repository's existing consumer/package check after installing development dependencies:

```sh
npm run test:install
```

## Release Checklist

<a id="release-evidence"></a>

### Release evidence

The release gate verifies:

- 13 focused regression tests;
- five differential compatibility scenarios against `combine-source-map@0.8.0`;
- 99%+ line coverage and 100% function coverage;
- bounded malformed-comment processing;
- Node.js 12, 14, 16, 18, 20, 22, and 24;
- TypeScript 3.9, 4.7, 4.9, 5.9, 6.0, and 7.0;
- CommonJS, native ESM, browser, packed install, `publint`, and type checks.

The interactive [documentation playground](https://alexandro.net/docs/vanilla/combine-source-map/)
runs the production browser bundle and decodes its combined map for inspection.

Run `npm run test` and inspect the package contents before release. Publish a new version through the [GitHub Actions publishing workflow](https://github.com/alexandroit/stackline-combine-source-map/actions/workflows/publish.yml), using the SHA-512 digest of the reviewed tarball. Verify the exact published version, tarball integrity, and npm provenance after the run.

## Community and Support

Report reproducible package issues in the [issue tracker](https://github.com/alexandroit/stackline-combine-source-map/issues). Use the [security policy](https://github.com/alexandroit/stackline-combine-source-map/blob/main/SECURITY.md) for vulnerability reports.

- [Stackline / Alexandro.Net](https://alexandro.net/)
- [GitHub](https://github.com/alexandroit)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)
- [Reddit community: r/Stackline](https://www.reddit.com/r/Stackline/)

## License

[MIT](https://github.com/alexandroit/stackline-combine-source-map/blob/main/LICENSE)
