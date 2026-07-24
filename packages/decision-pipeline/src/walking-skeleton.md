# Decision Pipeline Walking Skeleton

## Purpose

This milestone validates that the architectural spine can be exercised from input to output.

The goal is not production behavior. The goal is proving that boundaries connect correctly.

## Flow

```
Mock Domain Event
        |
        v
Policy Result
        |
        v
Policy Decision Adapter
        |
        v
Decision Pipeline
        |
        v
Decision Output
```

## Constraints

This validation intentionally excludes:

- Real event sources
- Real policies
- AI reasoning
- Hardware
- Action execution

## Engineering Goal

A walking skeleton proves that the architecture can move before adding complexity.
