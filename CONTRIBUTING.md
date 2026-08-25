# Contributing

## Development

The Stackline source-map packages must be available in the configured registry
before installing this project.

```sh
npm ci
npm test
npm run test:attw
npm run audit:dependencies
npm pack --dry-run
```

## Compatibility

Changes must preserve the contract in
[COMPATIBILITY_CONTRACT.md](./COMPATIBILITY_CONTRACT.md). Add differential tests
for normal upstream behavior and focused regressions for corrected edge cases.

Do not make `base64()` or `comment()` asynchronous. Do not raise the Node.js or
TypeScript floor without a major release and migration evidence.

## Pull Requests

- keep changes focused;
- include tests and documentation;
- retain license and attribution files;
- do not add runtime dependencies without recording the decision;
- verify the packed artifact, not only the working tree.
