# Decision Pipeline Fixture Harness

## Purpose

This fixture harness provides reusable deterministic inputs for validating pipeline behavior.

## Goals

- Keep tests focused on contracts
- Avoid dependency on external systems
- Provide predictable domain representations
- Allow future scenarios to be added consistently

## Usage

Fixtures should represent meaningful test scenarios rather than implementation details.

Future fixtures may include:

- Domain events
- Policy results
- Decisions
- Action outcomes

## Constraint

Fixtures exist to support validation. They do not replace real integrations.
