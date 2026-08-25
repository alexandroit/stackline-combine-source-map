# Compatibility Contract

## Baseline

The behavioral baseline is `combine-source-map@0.8.0`.

The following remain compatible:

- `require('combine-source-map')` when installed through an npm alias;
- `create(file?, sourceRoot?)`;
- chainable `addFile(options, offset?)`;
- synchronous string returns from `base64()` and `comment()`;
- `removeComments(source)`;
- identity mappings when no usable embedded source content exists;
- line and column offset behavior;
- the `_addGeneratedMap` and `_addExistingMap` methods exposed on instances;
- the default generated filename `generated.js`.

## Supported Environments

- Node.js 12 through current Node.js releases;
- CommonJS and native ESM;
- browser bundles with standard `URL`, `TextEncoder`, `TextDecoder`, `atob`,
  and `btoa` globals;
- TypeScript 3.9 and newer.

## Intentional Corrections

These edge cases intentionally differ from `0.8.0`:

- empty embedded source text counts as embedded content;
- later embedded sources are honored when the first content entry is null;
- offset objects are not mutated and do not need `Object.prototype`;
- Windows, UNC, and URI paths are recognized independently of the host OS;
- dangerous source names are stored as data without prototype side effects;
- source-map comments are discovered and removed with linear scanning;
- indexed section maps are flattened synchronously;
- process-wide memoization is removed to avoid cache growth and key collision.

## Non-Goals

- changing the Source Map v3 format;
- making the public API Promise-based;
- resolving external `.map` files from the filesystem;
- interpreting source-map comments found inside string literals.
