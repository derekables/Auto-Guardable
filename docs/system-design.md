# Auto-Guardable System Design

## Overview

Auto-Guardable is an event-driven property-protection platform intended to observe situations, evaluate context, select proportionate responses, communicate respectfully, and record outcomes.

The current repository contains a runnable browser MVP. It demonstrates a narrow vertical slice; it does not yet implement the full service-oriented target architecture described below.

## Implemented MVP architecture

The current runtime is a single Node.js web application in `apps/web`:

```
Browser Camera (on-demand frame capture)
        |
        v
AI Observation Provider
        |
        v
JavaScript Policy Module
        |
        v
Local JSONL Event Store
        |
        +----> Browser-Native Speech
        |
        v
Browser Dashboard and Event History
```

The server exposes the MVP endpoints for status, events, policy updates, live analysis, deterministic simulation, announcement playback logging, and log reset.

### Current component responsibilities

- **Browser camera:** obtains a frame only when the operator requests a scan.
- **AI provider:** describes visible content and returns normalized observation data. It is not the policy authority.
- **Policy module:** deterministically evaluates configured operating hours, the after-hours announcement setting, and in-memory cooldown.
- **Event store:** appends event records to a local JSONL file.
- **Browser speech:** speaks the approved announcement and reports completion to the server.
- **Dashboard:** provides camera controls, simulation, policy configuration, latest decision, and event history.

## Architectural safety boundary

AI is advisory. The provider must not infer identity, intent, criminality, threat, or legal status. The deterministic policy layer controls whether an announcement is scheduled. No automated police/emergency escalation or physical intervention is implemented.

When the live provider is configured, the captured frame is sent to its configured OpenAI-compatible API endpoint. Demo mode avoids external AI calls. The local event log stores normalized observation/event data, not the source image.

## Target platform architecture

The broader design is intended to grow toward replaceable services and adapters:

```
Camera / Sensor Adapters
        |
        v
Normalized Observation and Domain Events
        |
        v
Vision and Event Services
        |
        v
Policy Engine
        |
        v
Incident / Response Coordinator
        |
        v
Approved Action Adapters
        |
        v
Speech / Notification / Operator Interfaces
        |
        v
Durable Event Store and Audit Tools
        |
        v
Browser Dashboard
```

This is a target map, not a claim that each service already exists.

## Deferred capabilities

- RTSP/ONVIF and other camera adapters.
- Local vision inference and configurable inference providers.
- Durable event database, retention, replay, and incident state.
- Multi-zone rules, grace periods, repeated-presence handling, and human review.
- Replaceable speech package and local/server-side TTS.
- Authentication, authorization, and multi-property tenancy.
- Deployment packaging, monitoring, and production operations.

## Relationship to the TypeScript decision-pipeline scaffold

The TypeScript source under `packages/decision-pipeline` is not currently integrated into `apps/web`; its orchestrator remains a placeholder. The MVP uses JavaScript policy and event-store modules. See [decision-pipeline.md](architecture/decision-pipeline.md) for the exact boundary.

## Architectural principles

Every production subsystem should:

- have one clear responsibility;
- communicate through explicit, versionable contracts;
- be replaceable without redesigning the whole platform;
- fail safely and expose understandable failure states;
- preserve human accountability and dignity;
- make consequential behavior observable and auditable.
