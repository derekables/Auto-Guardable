# ADR-0003: Local-First Deployment

## Status

Accepted

## Context

Auto-Guardable is intended to operate as a practical security and property-protection product. Local operation improves privacy, reduces latency, and increases reliability when internet connectivity is limited or unavailable.

A local-first design also aligns with the project's commitment to operational transparency and customer control.

## Decision

Auto-Guardable will be designed for local-first deployment whenever practical.

Cloud services may be supported later, but they will remain optional rather than required for normal operation.

## Consequences

- Core functions should continue working without internet access where feasible.
- Privacy-sensitive data should remain local by default.
- Deployment should favor simple local infrastructure.
- Cloud integrations must be treated as optional adapters rather than architectural dependencies.
