# Auto-Guardable Component Contracts

## Purpose

This document describes the intended boundaries between major Auto-Guardable components and maps them to the current MVP implementation.

The contracts are architectural guidance, not a claim that every named subsystem already exists as an independent package or service.

## Core principle

Components should answer:

> What do I provide?

not:

> How does another component work internally?

## Current MVP implementation map

| Responsibility | Current implementation | Status |
|---|---|---|
| Camera input | Browser `getUserMedia()` and on-demand frame capture | Implemented |
| AI observation | `@auto-guardable/ai` provider interface and OpenAI Responses adapter | Implemented |
| Policy | `apps/web/src/policy.js` | Implemented; deterministic operating-hours/cooldown rules |
| Event history | `apps/web/src/event-store.js` | Implemented; local JSONL, not a database |
| Speech | Browser SpeechSynthesis API | Implemented as MVP adapter |
| Decision-pipeline package | `packages/decision-pipeline` TypeScript scaffold | Not integrated; orchestrator remains a placeholder |
| Camera integrations | RTSP/ONVIF adapters | Not implemented |
| Incident coordination | Persistent incident state machine | Not implemented |
| Authentication | User and operator identity/access controls | Not implemented |

## Target system contract overview

```
Observation Source
  |
  v
Normalized Observation
  |
  v
Domain Event
  |
  v
Policy Engine
  |
  v
Decision
  |
  v
Response Coordinator
  |
  v
Approved Action Request
  |
  v
Speech / Notification / Other Adapter
  |
  v
Outcome Event and Audit Store
```

## Observation contract

### Responsibility

Provide normalized observations from supported camera or sensor sources.

An observation may report visible facts such as whether a person is present, an estimated count, confidence, and a bounded description.

### Boundary

Observation providers must not determine identity, intent, criminality, threat level, or legal status. They do not select or execute policy actions.

## Event contract

### Responsibility

Provide a common language between system components.

The TypeScript domain-event scaffold currently describes:

```typescript
DomainEvent {
  id: string
  type: string
  timestamp: Date
  source: string
  payload: unknown
}
```

The MVP currently appends event-shaped records to JSONL rather than using a shared event bus.

## Policy contract

### Responsibility

Evaluate an observation and operational context and decide whether a response is appropriate.

The current JavaScript policy is deterministic and considers configured operating hours, whether after-hours announcements are enabled, and an in-memory cooldown. It does not infer threat or intent.

Policy does not access cameras, call AI providers, or speak directly.

## Action and speech contract

### Responsibility

Deliver an action only after the policy layer approves it.

The MVP uses browser-native speech for approved announcements. The speech adapter does not decide what should be said or whether intervention is warranted.

## AI provider contract

### Responsibility

Allow multiple AI implementations without changing application policy.

The current provider exposes scene analysis and returns normalized observation data. The demo provider supports testing without a key; the OpenAI Responses API adapter provides live analysis when configured.

## Storage contract

### Responsibility

Persist event history and operational records.

The current MVP uses local JSONL. A durable event store, retention controls, replay, and multi-user audit capabilities remain future work.

## Contract rules

All production contracts should:

- use explicit, versionable schemas;
- be testable without hardware or external services;
- avoid leaking implementation details;
- preserve replaceability;
- expose failure states;
- keep observation, policy, and action authority separate.
