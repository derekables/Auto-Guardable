# ADR-0002: Event-Driven Core

## Status

Accepted

## Context

Auto-Guardable is not fundamentally a camera app. It is an event engine. Camera detections, policy outcomes, announcements, and incident closures all represent events that move through the system.

An event-driven architecture allows the platform to grow from a simple camera-to-speech workflow into a broader property protection system without redesigning the core.

## Decision

The core of Auto-Guardable will be event-driven.

System behavior should be modeled as a chain of domain events such as:

- PersonDetected
- PolicyEvaluated
- AnnouncementScheduled
- AnnouncementPlayed
- PersonLeft
- IncidentClosed

## Consequences

- Subsystems communicate through events rather than tight direct coupling.
- Future sensors and inputs can join the platform without changing the overall architecture.
- Event history and auditability become first-class concerns.
- The system becomes easier to test, extend, and reason about.
