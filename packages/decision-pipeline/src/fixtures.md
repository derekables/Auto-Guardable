# Domain Fixture Conventions

## Purpose

This document establishes conventions for test fixtures used throughout Auto-Guardable.

Fixtures provide predictable representations of domain inputs while keeping tests independent from production integrations.

## Principles

- Fixtures represent domain concepts, not implementation details.
- Tests should describe behavior through contracts.
- External systems should be replaced with deterministic test data.
- Fixtures should remain small and intentional.

## Current Pipeline Validation Flow

```
Domain Fixture
      |
      v
Policy Result Fixture
      |
      v
Decision Adapter
      |
      v
Decision Pipeline
      |
      v
Decision Output
```

## Future Usage

Fixtures may later represent:

- Camera observations
- Sensor events
- Policy scenarios
- Action outcomes

without requiring those systems to exist during foundation development.
