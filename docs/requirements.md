# Auto-Guardable Product Requirements

## Purpose

This document defines what Auto-Guardable must do before implementation decisions are considered.

The purpose of this document is to establish a shared product contract between stakeholders, designers, and engineers.

Auto-Guardable is a browser-first, local-first property protection system designed to prioritize de-escalation, transparency, and human dignity.

## Product Goal

Auto-Guardable should help organizations protect their spaces while reducing unnecessary conflict through intelligent automation, respectful communication, and proportional responses.

The system should not attempt to win confrontations. It should help resolve situations safely and respectfully.

## MVP Definition

The minimum viable product succeeds when it can complete the following workflow:

```
One camera
    ↓
One detected person
    ↓
One policy decision
    ↓
One spoken announcement
    ↓
One logged event
```

## Functional Requirements

### Camera Input

The system must support receiving input from security camera sources through an extensible interface.

Initial supported sources should prioritize existing camera installations, including IP camera systems.

Future supported sources may include:

- RTSP
- ONVIF
- USB cameras
- Other compatible local devices

### Detection and Events

The system must represent meaningful occurrences as events.

Examples:

- PersonDetected
- PolicyEvaluated
- AnnouncementScheduled
- AnnouncementPlayed
- IncidentClosed

The event system must allow future expansion beyond cameras.

### Policy Evaluation

The system must evaluate detected situations against configurable policies.

Policies should determine appropriate responses based on context rather than relying on a single universal reaction.

### Communication

The system must be capable of delivering natural-language announcements through speech output.

Communication should prioritize:

- clarity
- respect
- voluntary compliance
- transparency

### Logging

The system must maintain an understandable record of significant events.

Logs should support:

- troubleshooting
- accountability
- system improvement

## Human Dignity Requirements

Auto-Guardable must:

- attempt de-escalation before escalation
- avoid unnecessarily threatening language
- provide reasonable opportunity for voluntary compliance
- treat people as humans rather than problems to remove

## Privacy Requirements

Auto-Guardable should:

- prefer local processing when practical
- minimize unnecessary data collection
- make system behavior understandable
- avoid unnecessary identity tracking

## Safety Requirements

The system must:

- fail safely
- avoid unpredictable autonomous escalation
- keep humans responsible for critical decisions
- maintain clear operational boundaries

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
