# Policy Decision Adapter

## Purpose

The policy decision adapter creates the translation boundary between policy evaluation and the decision pipeline.

## Responsibility

The adapter converts policy output into a standardized Decision contract.

```
Policy Result
      |
      v
Policy Decision Adapter
      |
      v
Decision
```

## Non-Responsibilities

The adapter does not:

- Define policy rules
- Evaluate domain events
- Execute actions
- Communicate with external systems

## Design Goal

Policies should remain independent from the pipeline while decisions remain consistent across future implementations.
