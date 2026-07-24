# Decision Pipeline Skeleton

## Purpose

This document defines the next architectural boundary for Auto-Guardable after establishing component contracts, domain events, policy contracts, and the engineering handoff.

This milestone creates the language and flow of decision processing without implementing real-world integrations or automation execution.

---

## Current Position

The foundation currently supports:

```
Observation Source
        |
        v
Domain Event
        |
        v
Policy Evaluation
        |
        v
Policy Decision
```

The Decision Pipeline extends this model by defining how these pieces communicate.

---

## Target Flow

```
Observation Source
        |
        v
Event Boundary
        |
        v
Policy Engine
        |
        v
Decision Output
        |
        v
Action Boundary
```

---

## Design Principles

### Decisions Are Not Actions

The decision pipeline determines what should happen. Execution remains a separate concern.

Example:

```
Decision:
  "notify homeowner"

Action:
  send notification
```

The pipeline does not own the action implementation.

---

## Scope of This Milestone

Included:

- Define decision pipeline interfaces
- Document communication flow
- Preserve component independence
- Establish future extension points

Not included:

- Camera integrations
- Speech systems
- Notifications
- Hardware control
- AI reasoning
- Automated response execution

---

## Future Extensions

Potential future components may attach to these boundaries:

- Camera observation adapters
- Sensor integrations
- Machine learning classifiers
- Human review workflows
- Automation executors

The architecture should allow these additions without changing existing domain contracts.

---

## Engineering Goal

The decision pipeline should remain simple, observable, and replaceable.

The system should gain capabilities by adding implementations behind boundaries, not by changing the core language of the platform.
