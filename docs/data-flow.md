# Auto-Guardable Event Flow

## Purpose

This document describes how information moves through Auto-Guardable without defining implementation details.

## Person Detection Flow

```
Camera provides input
        ↓
Vision service analyzes observations
        ↓
PersonDetected event created
        ↓
Policy engine evaluates context
        ↓
Response decision selected
        ↓
Speech service communicates response
        ↓
Event store records outcome
```

## Example Event Sequence

```
PersonDetected
        ↓
PolicyEvaluated
        ↓
AnnouncementScheduled
        ↓
AnnouncementPlayed
        ↓
PersonLeft
        ↓
IncidentClosed
```

## Future Event Sources

The architecture should support events from sources including:

- cameras
- microphones
- door sensors
- alarm systems
- environmental sensors
- access control systems

New sources should integrate through the event model rather than requiring redesign of the entire system.

## Design Goal

The system should make every important action traceable, explainable, and reviewable.
