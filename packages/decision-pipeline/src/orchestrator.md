# Decision Pipeline Orchestration

## Purpose

This layer coordinates the movement of data through the decision pipeline.

It is intentionally not responsible for:

- policy rules
- action execution
- hardware communication
- AI inference

## Current Responsibility

The orchestrator provides the location where future implementations can connect:

```
Domain Event
      |
      v
Policy Evaluation
      |
      v
Decision Orchestration
      |
      v
Future Action Boundary
```

## Design Constraint

The orchestration layer should coordinate existing contracts, not become a new source of domain logic.
