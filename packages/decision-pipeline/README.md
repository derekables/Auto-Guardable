# Decision Pipeline Scaffold

## Status: not integrated into the runnable MVP

This directory contains an intentionally minimal TypeScript scaffold for Auto-Guardable's decision boundary. It is not currently a separately declared pnpm workspace package and is not imported by `apps/web`.

The current runnable MVP implements its operational policy and event flow in:

- `apps/web/src/policy.js`
- `apps/web/src/event-store.js`
- `apps/web/src/server.js`

The scaffold's `BasicDecisionPipeline` currently returns a decision with type `unimplemented`. Its walking-skeleton test describes intended movement through the types, not a production decision engine. The TypeScript test is not included in the current JavaScript workspace test scripts.

## Purpose

This scaffold records the intended package boundary for translating policy results into decisions without coupling policy logic to action execution.

## Current scope

- Minimal `Decision` type.
- `DecisionPipeline` interface.
- Policy-decision adapter interface.
- Basic orchestration placeholder.
- Fixture and test-convention documentation.

## Design rules

- Decisions describe what should happen.
- Actions execute approved decisions and remain outside this package.
- No hardware integrations belong here.
- No AI provider belongs here.
- No external side effects should occur in this boundary.

## Promotion criteria

Before treating this as a working package:

1. Add a package manifest and include it in the pnpm workspace.
2. Implement meaningful decision behavior rather than returning `unimplemented`.
3. Add executable tests using the repository's actual test runner.
4. Integrate it behind a narrow boundary in `apps/web`.
5. Verify that policy logic is not duplicated and that the AI remains advisory.

Until those steps are complete, this directory is an architectural scaffold only.
