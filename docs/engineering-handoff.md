# Auto-Guardable Engineering Handoff

## Purpose

This document captures the current architectural state of Auto-Guardable and provides the context required for future engineering work.

The goal is to preserve design intent as the system grows, ensuring that future contributors understand not only what exists, but why the boundaries were created.

---

## Vision

Auto-Guardable is designed as an extensible automation and security platform built around independent components communicating through explicit contracts.

The long-term system will support observation sources, intelligent evaluation, and automated responses while maintaining clear separation between sensing, decision-making, and action execution.

---

## Current Architectural State

The repository is currently in the foundation phase.

Completed architectural milestones:

- Component boundaries defined
- Repository organization established
- Monorepo tooling initialized
- Domain event system introduced
- Policy decision boundary introduced

Current system flow:

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
        |
        v
Future Action Boundary
```

---

## Design Philosophy

### Contracts Over Coupling

Components communicate through explicit contracts rather than direct implementation dependencies.

### Events Over Direct Calls

Sources of information emit domain events. Consumers react to shared contracts instead of depending on specific producers.

### Policies Produce Decisions

Policies evaluate events and produce decisions. They do not directly execute actions.

### Boundaries Before Capabilities

New capabilities should be introduced only after the appropriate architectural boundary exists.

---

## Domain Vocabulary

### Observation

An input from an external source that may represent something occurring in the environment.

### Domain Event

A normalized representation of something observed by the system.

### Policy

A component responsible for evaluating events according to defined rules.

### Decision

The result of policy evaluation, representing what should happen without performing the action itself.

### Action

A future execution boundary responsible for carrying out approved decisions.

---

## Explicit Non-Goals During Foundation Phase

The following are intentionally deferred:

- Camera integrations
- Speech systems
- Automated responses
- AI reasoning systems
- Hardware-specific dependencies

These capabilities will be introduced after the supporting contracts and boundaries are mature.

---

## Next Planned Milestone

The next architectural milestone is the Decision Pipeline Skeleton.

Expected flow:

```
Observation Source
        |
        v
Domain Event System
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

This milestone should establish the communication path without introducing real-world integrations.

---

## Engineering Principle

Auto-Guardable should remain understandable as it grows.

Every major architectural decision should be documented, isolated, and introduced incrementally through focused changes.
