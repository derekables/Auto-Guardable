# Auto-Guardable Data Flow

## Purpose

This document records both the data flow implemented in the current MVP and the broader event-driven flow the product is intended to grow toward. These must not be conflated.

## Implemented MVP flow

The runnable application in `apps/web` follows this on-demand path:

```
Operator starts browser camera
        |
        v
Operator requests a frame scan
        |
        v
Browser captures a JPEG data URL
        |
        v
Configured AI provider returns a normalized observation
        |
        v
PersonDetected event appended to local JSONL log
        |
        v
Deterministic policy evaluates operating hours and cooldown
        |
        v
PolicyEvaluated event appended
        |
        +----> If approved: AnnouncementScheduled event
                         |
                         v
                  Browser speech output
                         |
                         v
                  AnnouncementPlayed event
```

The simulator follows the policy path without camera capture or an external AI call. Policy changes are also recorded as `PolicyUpdated` events.

## Current event records

The MVP currently writes these event types:

- `PersonDetected`
- `PolicyEvaluated`
- `AnnouncementScheduled`
- `AnnouncementPlayed`
- `PolicyUpdated`

The current implementation does **not** yet implement the broader incident lifecycle events sometimes used in design examples, such as `PersonLeft` or `IncidentClosed`.

## Current storage behavior

Events are appended as JSON Lines to `apps/web/data/events.jsonl` by default. The browser dashboard reads recent records from the local server. The event log is local and human-inspectable, but it is not a durable database and does not yet provide replay, retention policy, or multi-user audit controls.

The original camera frame is passed to the configured provider for analysis but is not written to the local event log. When the live provider is enabled, the frame leaves the local browser/server environment for the configured OpenAI-compatible API endpoint.

## Target event-driven flow

The longer-term architecture may expand to:

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
Policy Evaluation
        |
        v
Decision
        |
        v
Response Coordinator
        |
        v
Approved Action Adapter
        |
        v
Outcome Event and Audit Store
```

Future sources may include RTSP/ONVIF cameras, door sensors, alarms, microphones, environmental sensors, and access-control systems. They should enter through explicit adapters and the shared event model rather than coupling directly to policy or speech implementations.

## Design goal

Every consequential transition should be traceable, explainable, and reviewable. The system should record not only what happened, but which observation and policy context led to a response.
