# Changelog

All notable changes to this project are documented here.

## 1.0.1 - 2026-08-25

### Added

- Public interactive documentation running the production browser bundle.
- Machine-readable `llms.txt` and `llms-full.txt` references.
- Gold-standard repository metadata, issue templates, pinned CI, CodeQL, and
  immutable release automation with checksums and SBOM output.

### Changed

- Pointed package metadata to the canonical Alexandro.Net documentation.

The JavaScript implementation and public API are unchanged from `1.0.0`.

## 1.0.0 - 2026-08-24

### Added

- Native ESM entry point alongside the compatible CommonJS API.
- TypeScript declarations compatible with TypeScript 3.9 and newer.
- Browser distribution and install smoke tests.
- Indexed source-map support through a synchronous mappings engine.
- Regression, differential, malformed-input, package, and version-matrix tests.

### Changed

- Replaced the 2017 mapping consumer with `@jridgewell/trace-mapping`.
- Replaced legacy source-map helpers with Stackline-maintained aliases.
- Replaced host-dependent path handling with portable URI/path resolution.
- Removed the global, unbounded memoization cache.

### Fixed

- Offset objects with null prototypes or shadowed `hasOwnProperty` values.
- Inline maps whose first source content is empty or null but another source is
  embedded.
- Windows drive paths, UNC paths, backslashes, and uppercase/custom URI schemes.
- Dangerous source names including `__proto__`, `prototype`, and `constructor`.
- Potentially quadratic source-map comment scanning on malformed multiline
  input inherited from the legacy parser path.
