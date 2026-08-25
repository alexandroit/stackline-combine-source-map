# Migration

## Recommended Direct Migration

```sh
npm remove combine-source-map
npm install @stackline/combine-source-map
```

```diff
- const combine = require('combine-source-map');
+ const combine = require('@stackline/combine-source-map');
```

## Zero-Source-Change Migration

Install the scoped package under the original dependency name:

```sh
npm install combine-source-map@npm:@stackline/combine-source-map
```

No import change is required:

```js
const combine = require('combine-source-map');
```

Equivalent `package.json` entry:

```json
{
  "dependencies": {
    "combine-source-map": "npm:@stackline/combine-source-map@^1.0.0"
  }
}
```

## ESM

```js
import combine, { create, removeComments } from '@stackline/combine-source-map';
```

## Compatibility Note

`base64()` and `comment()` remain synchronous. Code written for
`combine-source-map@0.8.0` must not need `await` after migration.

See [COMPATIBILITY_CONTRACT.md](./COMPATIBILITY_CONTRACT.md) for corrected edge
cases.
