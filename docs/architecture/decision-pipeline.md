# Decision Pipeline: Scaffold and Runtime Boundary

## Purpose

This document distinguishes two related but currently separate things:

1. the TypeScript decision-pipeline scaffold under `packages/decision-pipeline`; and
2. the runnable JavaScript MVP path under `apps/web`.

They share the same architectural intent—keep observation, policy, decisions, and actions separate—but the MVP does not yet use the TypeScript scaffold.

## Current MVP runtime

The implemented application flow is:

```
Browser Camera Frame
        |
        v
AI Observation Provider
        |
        v
PersonDetected Event (JSONL)
        |
        v
Deterministic Policy Evaluation
        |
        v
PolicyEvaluated Event
        |
        +----> AnnouncementScheduled (when policy allows)
                         |
                         v
                Browser Speech
                         |
                         v
                AnnouncementPlayed
```

The current implementation is in `apps/web/src/server.js`, `apps/web/src/policy.js`, and `apps/web/src/event-store.js`. The policy decision is deterministic; AI supplies an observation only.

## TypeScript scaffold status

The code under `packages/decision-pipeline` defines the beginnings of a `Decision` contract, a `DecisionPipeline` interface, an adapter interface, a basic orchestrator, and a walking-skeleton test.

This folder currently has no `package.json`, so it is not an independently declared pnpm workspace package. Its `BasicDecisionPipeline` currently returns a decision with type `unimplemented`. The scaffold is not imported by the browser MVP, and its TypeScript test is not part of the current JavaScript package test scripts.

Treat this as an intentionally incomplete architectural seam—not as a working runtime pipeline.

## Design principles

### Decisions are not actions

A decision describes what the system has selected. An action adapter performs the side effect. For example:

```
Decision: request a respectful announcement
Action: deliver the announcement through a speech adapter
```

The policy layer decides whether a response is appropriate. The speech layer must not create or change policy.

### AI is advisory

The vision provider may return normalized observations. It must not make determinations about identity, intent, threat, criminality, or legal status, and it must not directly authorize an action.

### Boundaries must be observable

Each transition should be inspectable through explicit contracts, tests, and event history. The system should preserve the reason for a decision, not only the resulting action.

## Scope of the current scaffold

Included:

- Minimal decision and pipeline TypeScript interfaces.
- Policy-to-decision adapter interface.
- Minimal orchestration placeholder.
- Test fixture and walking-skeleton documentation.

Not yet included:

- A production decision implementation.
- Integration with `apps/web`.
- Real event transport or persistence.
- Camera or speech adapters.
- Action execution.
- Runtime AI integration.

## Next integration step

When the scaffold is promoted into a real package, add its package manifest, executable implementation, and tests to the workspace. Then integrate it behind a narrow boundary in the web runtime without duplicating policy logic. Until that work is verified, keep the current MVP runtime and the TypeScript scaffold documented separately.
