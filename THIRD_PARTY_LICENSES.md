# Third-Party Licenses

The runtime dependency graph consists of independently maintained open-source
packages. Consumers should use the package lock and `npm ls --all` for the exact
resolved graph of a given installation.

| Package | Purpose | License |
| --- | --- | --- |
| `@stackline/convert-source-map` | Inline map parsing and comment scanning | MIT |
| `@stackline/inline-source-map` | Combined map generation and base64 output | MIT |
| `@jridgewell/trace-mapping` | Synchronous Source Map v3 traversal | MIT |
| `@jridgewell/resolve-uri` | URI and cross-platform path resolution | MIT |
| `@jridgewell/sourcemap-codec` | Transitive VLQ codec | MIT |
| `source-map` | Generator used by `@stackline/inline-source-map` | BSD-3-Clause |

The complete license texts are shipped by each dependency in its npm package.
