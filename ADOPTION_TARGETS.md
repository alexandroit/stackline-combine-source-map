# Adoption Targets

## Best-Fit Consumers

- maintained Browserify transforms and plugin ecosystems;
- bundlers that still call the synchronous `combine-source-map` API;
- projects blocked from Node.js 22-only alternatives;
- TypeScript projects currently relying on external `@types` declarations;
- build tools accepting untrusted or cross-platform source-map paths;
- dependency owners replacing stale source-map helper chains.

## Migration Message

The recommended message is factual:

> This change replaces `combine-source-map@0.8.0` with a maintained scoped
> continuation through an npm alias. It preserves the synchronous API, adds
> first-party typings, modernizes map traversal, and covers malformed input and
> cross-platform paths with regression tests.

## Validation Before Outreach

- run the consumer's complete test suite;
- compare emitted source maps on representative bundles;
- verify the consumer's minimum Node.js version;
- avoid automated bulk issues or pull requests;
- disclose the independent-fork relationship and scoped dependency clearly.
