# Decision Pipeline Package

## Purpose

This package establishes the initial code boundary for Auto-Guardable's decision pipeline.

This milestone introduces the smallest executable structure for decision flow without implementing integrations, automation, or external actions.

## Current Flow

```
Domain Event
      |
      v
Policy Evaluation
      |
      v
Decision
```

## Design Rules

- Decisions describe what should happen.
- Actions execute decisions and remain outside this package.
- No hardware integrations belong here.
- No AI providers belong here.
- No external side effects should occur in this boundary.

## Future Growth

Future implementations may add:

- Decision routing
- Policy orchestration
- Audit trails
- Action adapters

while preserving the core contract.
