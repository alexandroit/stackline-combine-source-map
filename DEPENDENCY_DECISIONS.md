# Dependency Decisions

## Runtime

### `convert-source-map`

Resolved through `npm:@stackline/convert-source-map@^1.0.0`. This preserves the
historical import name inside the implementation while using the linear scanner
and defensive object handling validated in Gate 02.

### `inline-source-map`

Resolved through `npm:@stackline/inline-source-map@^1.0.0`. This preserves the
historical import name and uses the safe source-content storage validated in
Gate 01.

### `@jridgewell/trace-mapping`

Selected for synchronous Source Map v3 and indexed-map traversal without WASM.
It is actively maintained, broadly used, and avoids making the public API
Promise-based.

### `@jridgewell/resolve-uri`

Declared directly because production code imports it. It resolves relative
paths and URIs consistently across host operating systems. Depending on a
transitive copy would make the graph fragile.

## Removed

### `lodash.memoize`

Removed. Path rebasing is inexpensive, while the legacy process-wide cache was
unbounded and used a collision-prone serialized key.

### Direct `source-map` consumer

Removed from this package. Current `source-map` consumers are asynchronous due
to WASM, which conflicts with the compatibility contract. The Stackline inline
generator may use `source-map` internally for synchronous generation.

## Policy

Runtime dependencies are accepted only when they replace complex standards
logic with a proven implementation and preserve the supported environment.
