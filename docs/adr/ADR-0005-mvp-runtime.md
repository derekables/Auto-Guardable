# ADR-0005: MVP Runtime and AI Advisory Boundary

## Status

Accepted

## Context

The repository had a strong architectural foundation but no runnable end-to-end product. The first product milestone must prove the complete path from observation to communication without breaking the established separation between sensing, decision-making, and action.

The project also previously contained a GitHub Models workflow. GitHub Models was retired on July 30, 2026, so it can no longer serve as the MVP runtime AI path.

## Decision

The MVP will use:

- browser camera input as the first observation adapter;
- an AI provider abstraction with an OpenAI Responses API adapter;
- a deterministic policy engine for action selection;
- browser-native speech as the first speech adapter;
- a local JSONL event store for auditability;
- localhost binding by default.

AI is advisory. The AI provider may describe visible observations but does not decide threat level, intent, identity, legal status, or whether escalation is warranted.

The policy engine remains responsible for deciding whether an announcement should occur.

## Consequences

### Positive

- The complete product loop can be exercised with minimal infrastructure.
- The AI boundary remains replaceable.
- Browser speech keeps MVP deployment simple and local.
- JSONL keeps early operations transparent and debuggable.
- A missing AI credential does not block architectural testing.

### Deferred

- RTSP/ONVIF adapters
- local vision inference
- persistent database storage
- authentication and multi-tenant controls
- server-side speech
- advanced incident state management
