# Auto-Guardable Product Requirements

## Purpose

This document defines what Auto-Guardable must do and establishes a shared product contract between stakeholders, designers, and engineers.

Auto-Guardable is a browser-first, local-first property protection system designed to prioritize de-escalation, transparency, and human dignity.

## Product Goal

Auto-Guardable should help organizations protect their spaces while reducing unnecessary conflict through intelligent automation, respectful communication, and proportional responses.

The system should not attempt to win confrontations. It should help resolve situations safely and respectfully.

## MVP Definition

The minimum viable product succeeds when it can complete the following workflow:

```
One camera frame
    ↓
One AI-assisted observation
    ↓
One deterministic policy decision
    ↓
One respectful spoken announcement (when approved)
    ↓
One auditable event sequence
```

## Current implementation status

The repository now contains a runnable browser MVP in `apps/web`.

Implemented:

- On-demand browser camera capture.
- AI observation through a provider abstraction, with a demo provider that requires no API key.
- Deterministic operating-hours and announcement-cooldown policy.
- Browser-native speech for approved announcements.
- Local JSONL event history and a dashboard.
- Localhost binding by default.

Not implemented:

- RTSP/ONVIF camera adapters or continuous production-grade monitoring.
- Persistent incident state or cooldowns across restarts.
- Durable database storage, retention controls, or event replay.
- Authentication, authorization, and multi-property tenancy.
- Production monitoring, deployment packaging, or operational hardening.
- Automated police/emergency escalation or physical intervention.

The current MVP is an engineering proof, not a production security deployment.

## Functional Requirements

### Camera Input

The product must support receiving input from security camera sources through an extensible interface.

The MVP uses the browser's current camera through `getUserMedia()` and scans a frame only when requested. IP-camera adapters are future work.

Future supported sources may include:

- RTSP
- ONVIF
- USB cameras
- Other compatible local devices

### Detection and Events

The system must represent meaningful occurrences as events.

The MVP currently records:

- `PersonDetected`
- `PolicyEvaluated`
- `AnnouncementScheduled`
- `AnnouncementPlayed`
- `PolicyUpdated`

The event model should later expand to support a complete incident lifecycle, replay, and additional sources.

### Policy Evaluation

The system must evaluate detected situations against configurable policies.

The current MVP policy considers configured operating hours, whether after-hours announcements are enabled, and an in-memory cooldown. Policy remains deterministic; model output does not authorize an action.

### Communication

The system must be capable of delivering natural-language announcements through speech output.

The MVP uses browser-native speech. Communication should prioritize:

- clarity
- respect
- voluntary compliance
- transparency

### Logging

The system must maintain an understandable record of significant events.

The MVP uses local JSONL records. Future storage must support:

- troubleshooting
- accountability
- retention controls
- event replay and system improvement

## Human Dignity Requirements

Auto-Guardable must:

- attempt de-escalation before escalation whenever safe
- avoid unnecessarily threatening language
- provide reasonable opportunity for voluntary compliance
- treat people as humans rather than problems to remove

## Privacy Requirements

Auto-Guardable should:

- prefer local processing when practical
- minimize unnecessary data collection
- make system behavior understandable
- avoid unnecessary identity tracking
- clearly disclose when camera frames are sent to an external AI provider

In the current MVP, live analysis sends an explicitly captured frame to the configured OpenAI-compatible API endpoint. Demo mode avoids that external call. The original frame is not written to the local JSONL event log.

## Safety Requirements

The system must:

- fail safely
- avoid unpredictable autonomous escalation
- keep humans responsible for critical decisions
- maintain clear operational boundaries

The current MVP has no authentication and must remain bound to localhost unless and until the access-control and deployment requirements are met.

## Non-Goals

Auto-Guardable is not intended to:

- replace emergency services
- make legal determinations
- become a general surveillance platform
- maximize enforcement actions
- remove the need for human judgment in exceptional situations

## Definition of Success

Auto-Guardable succeeds when organizations can protect their property while improving interactions between technology and people.

The product measure is not only whether an incident is detected, but whether it is handled appropriately.
