# Upstream Audit

Audit date: 2026-08-24 America/Toronto.

## Upstream

- Package: `combine-source-map@0.8.0`
- Repository: `thlorenz/combine-source-map`
- Latest npm release: 2017-03-20
- Latest source release commit: `a75f6c2`
- Repository state: not archived; last push observed 2022-12-18
- GitHub snapshot: 79 stars, 20 forks, 8 open issues
- Complete-week npm downloads, 2026-08-17 through 2026-08-23:
  `1,320,856`
- Exact-name GitHub Advisory search: no matching advisory found

The absence of a matching public advisory is not proof that the implementation
has no security risk. This audit does not assign a CVE or GHSA.

## Runtime Graph

The upstream declares:

- `convert-source-map ~1.1.0`
- `inline-source-map ~0.6.0`
- `lodash.memoize ~3.0.3`
- `source-map ~0.5.3`

The audited install resolved `convert-source-map@1.1.3`,
`inline-source-map@0.6.3`, `lodash.memoize@3.0.4`, and `source-map@0.5.7`.
The runtime-only audit reported zero known advisories; the historical
development graph reported six high and one critical finding.

## Verified Findings

1. `offset.hasOwnProperty(...)` throws for null-prototype offsets and offsets
   that shadow `hasOwnProperty`.
2. The process-wide memoization cache is unbounded, and its `::` string key can
   collide for distinct path triples.
3. Absolute-path behavior depends on the host platform and mishandles Windows
   drive paths when run on POSIX.
4. Protocol detection only recognizes lowercase `scheme://` values.
5. Embedded maps are ignored when `sourcesContent[0]` is empty, or when the
   first entry is null and a later entry contains source text.
6. Comment removal inherits the legacy regex scanning behavior documented in
   the P2 audit.
7. Legacy inline map storage does not defensively handle meta-property source
   names.
8. The package ships no first-party TypeScript declarations.
9. Historical CI only covered Node 0.10, 0.12, and io.js 2.4.

## Open Upstream Signals

Open issues include dependency modernization, package lock adoption,
`source-map` upgrades, Windows paths, inline map files, and offset behavior.

## Current Alternative

`@unabandoned/combine-source-map@1.0.2` was first published on 2026-08-13;
the registry timestamp for `1.0.2` is 2026-08-25 UTC. It is active, signed,
uses provenance, removes `lodash.memoize`, and upgrades its mapping stack.

It is not a drop-in replacement for the audited baseline:

- it requires Node.js 22.12 or newer;
- `base64()` and `comment()` return Promises;
- it has no bundled TypeScript declarations;
- it retains the offset ownership bug;
- it retains legacy comment scanning and meta-property storage paths;
- it retains resolver-key memoization behavior in its vendored code;
- it retains the first-source truthiness decision.

Its complete-week usage was 120 downloads in the observed registry data. These
facts describe different compatibility goals; they are not a claim that the
alternative is malicious or generally unsuitable.

## Gate 03

**GO.** The package still has substantial active demand, the original is stale,
verified compatibility and correctness gaps remain, and the current alternative
does not preserve the synchronous API or broad runtime floor required by this
mission.
