# Project TODO

## Release operations

- Configure npm Trusted Publishing for `alexandroit/stackline-combine-source-map`
  and `.github/workflows/publish.yml` after the first public release establishes
  the package.
- Require successful CI and CodeQL checks on the `main` branch.
- Review supported Node.js and TypeScript matrices at least twice per year.

## Maintenance

- Track Source Map v3, trace-mapping, and URI-resolution interoperability.
- Add fixtures when path, indexed-map, or embedded-content cases are reported.
- Keep Stackline compatibility aliases on tested 1.x ranges.
- Keep documentation examples executable and aligned with the packaged API.
