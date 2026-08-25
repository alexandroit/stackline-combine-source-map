# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| `1.x` | Yes |
| `<1.0.0` | No Stackline release |

## Reporting a Vulnerability

Do not open a public issue for an undisclosed vulnerability. Use GitHub's
private vulnerability reporting for the repository, or contact the maintainer
through the private address listed in the repository security settings.

Include:

- affected version and environment;
- minimal reproduction or malicious input;
- expected and observed behavior;
- impact assessment;
- any known workaround.

Reports will be acknowledged after receipt and assessed before public
disclosure. A coordinated advisory and patched release will be prepared when a
report is confirmed.

## Current Hardening

The test suite covers dangerous source names, null-prototype objects, shadowed
ownership properties, malformed source-map comments, and large newline-heavy
input. A passing test suite is not a guarantee that no vulnerability exists.
