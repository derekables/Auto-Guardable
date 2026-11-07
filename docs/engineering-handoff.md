# Auto-Guardable Engineering Handoff

## Purpose

This document captures the current architectural and runtime state of Auto-Guardable so future work can continue without relying on historical conversation context. The repository—not a chat summary—is the source of truth for code, version state, and completed work.

## Repository coordinates

- Repository: `derekables/Auto-Guardable`
- Default branch: `main`
- Verified main baseline for this handoff: `e01428f59e6cc4b0939bbf91271e4f5870e05f1b` (PR #21 merge)
- Root package version: `0.2.0`
- Latest published GitHub release inspected: `v0.1.0-foundation` (published 2026-07-24)
- `0.2.0` runnable-MVP release notes are being prepared; no `v0.2.0` tag or GitHub release was present at inspection time.

## Current state

Auto-Guardable has moved beyond the foundation-only phase. PR #21 added a runnable MVP in `apps/web`.

The current runtime path is:

```
Browser Camera (on-demand)
      ↓
AI Observation Provider
      ↓
Deterministic Policy Evaluation
      ↓
Approved Browser Speech
      ↓
Local JSONL Event Log
```

### Implemented

- Project constitution, product requirements, and architectural decisions.
- pnpm monorepo tooling and a basic GitHub Actions workflow.
- Browser-first MVP dashboard.
- Camera capture through `getUserMedia()`, initiated by the operator.
- AI provider abstraction and OpenAI Responses API adapter.
- Demo/simulation mode without an API key.
- Deterministic operating-hours and announcement-cooldown policy.
- Browser-native speech adapter.
- Local JSONL event log.
- Focused JavaScript tests for the AI provider and policy modules.

### Not implemented yet

- RTSP / ONVIF camera adapters.
- Continuous production-grade vision service.
- Local vision inference.
- Durable event database and persistent incident/cooldown state.
- Authentication, authorization, and multi-tenant controls.
- Production speech service.
- Multi-zone incident state machines.
- Production deployment packaging and operational monitoring.

## Important architectural distinction

The TypeScript source under `packages/decision-pipeline` is an incomplete architectural scaffold. It has no `package.json`, is not a separately declared pnpm workspace package, and is not imported by the runnable web app. Its `BasicDecisionPipeline` currently returns a decision with type `unimplemented`. The TypeScript walking-skeleton test is not included in the current workspace's JavaScript test scripts.

The runnable MVP currently uses `apps/web/src/policy.js` and `apps/web/src/event-store.js`. Do not say that the TypeScript decision-pipeline package powers the MVP until it is integrated and verified.

## AI, privacy, and safety boundary

AI is advisory. A provider may report visible observations; it must not determine identity, intent, criminality, threat level, legal status, or whether escalation is warranted. Deterministic application policy decides whether an announcement is appropriate.

When the live provider is configured, explicitly captured camera frames are sent to the configured OpenAI-compatible API endpoint. Demo mode avoids that external AI call. The local JSONL log stores event and observation data, not the original camera frame.

The server binds to `127.0.0.1` by default and has no authentication. Do not expose it to an untrusted network. Cooldown state is in memory and resets on restart.

## Version and release state

The root manifest already reports version `0.2.0`. The latest published release inspected is still `v0.1.0-foundation`, whose notes named a walking-skeleton milestone as the next phase. The current proposed `0.2.0` scope is the runnable MVP. Prepared changelog notes do not mean a GitHub release or tag has been published.

## Verification and release gate

The push workflow for main commit `e01428f` (run #6, GitHub Actions run ID `42255816239`) concluded `failure`. The associated job reported zero executed steps, and job logs were not retrievable through the connected integration. This does not establish whether the cause was runner provisioning, workflow configuration, or application code. No passing CI result is established for this baseline.

Before publishing the next release:

1. Diagnose why the main-branch CI job failed before its first reported step.
2. Run `pnpm lint`, `pnpm test`, and `pnpm build` successfully.
3. Perform a localhost smoke test of camera permission, demo simulation, policy save, announcement, event history, and log reset.
4. Confirm the release notes and tag point to the verified commit.

## Recommended next work

1. Restore a verifiable green CI run.
2. Add server/API and event-store integration tests.
3. Decide whether to promote the TypeScript decision-pipeline scaffold into a real workspace package and integrate it, or keep it explicitly parked.
4. Add persistent incident state and cooldown handling.
5. Implement an RTSP/ONVIF observation adapter behind the established boundary.
6. Add authentication and deployment hardening before any non-local deployment.

## Continuity protocol

At the start of a new engineering session:

1. Confirm the repository and default branch.
2. Read this handoff, the README, and CHANGELOG.
3. Inspect current package manifests, recent commits, tags, and GitHub releases.
4. Compare documentation claims with actual code and tests.
5. Treat Git history and checked-in artifacts as authoritative over recollection or conversational summaries.

Update this handoff when implementation status, architecture, release state, or a meaningful blocker changes.
