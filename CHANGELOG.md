# Changelog

This file records repository milestones. A changelog entry marked **proposed** or **prepared** is not a published GitHub release. A release is published only when its tag and GitHub release exist.

## v0.2.0-mvp — Runnable MVP

**Status: proposed prerelease; not yet tagged or published.**  
**Prepared:** 2026-11-06  
**Repository package version:** `0.2.0` (already set in the root `package.json`).

This milestone replaces the earlier planned “0.2.0 Walking Skeleton” label from the foundation release notes with a more meaningful deliverable: the first runnable browser MVP.

### Added

- Browser-first dashboard and Node.js server under `apps/web`.
- On-demand browser camera capture through `getUserMedia()`.
- AI-provider boundary with an OpenAI Responses API adapter and a deterministic demo provider.
- Normalized visual observations.
- Deterministic operating-hours and announcement-cooldown policy.
- Browser-native speech for policy-approved announcements.
- Local JSONL event history and dashboard inspection.
- Focused JavaScript tests for policy and AI-provider behavior.
- GitHub Actions workflow for lint, test, and build checks.
- Documentation for the runtime, data flow, safety boundary, and engineering handoff.

### Removed or replaced

- Removed the retired GitHub Models demo workflow from the active CI configuration.
- The old foundation-only description is superseded by the runnable MVP description.

### Important limitations

This is an engineering MVP, not a production-ready security deployment:

- Camera scans are on demand; continuous vision is not implemented.
- RTSP/ONVIF adapters are not implemented.
- The TypeScript decision-pipeline directory remains an unintegrated scaffold; the web MVP currently uses its own JavaScript policy and JSONL event-store modules.
- The app has no authentication and binds to localhost by default.
- Live analysis sends explicitly captured frames to the configured OpenAI-compatible API endpoint.
- Incident state and announcement cooldown are not persisted across server restarts.
- Durable database storage, retention controls, multi-property tenancy, and production deployment packaging remain future work.

### Verification status

The push workflow for main commit `e01428f59e6cc4b0939bbf91271e4f5870e05f1b` (GitHub Actions run #6, ID `42255816239`) concluded **failure**. The associated job reported zero executed steps, and its logs were not retrievable through the connected GitHub integration. This does not identify the cause and does not establish that application tests failed; it also does not establish a passing build.

**Release gate:** diagnose the CI job-start failure, obtain a green run for `pnpm lint`, `pnpm test`, and `pnpm build`, and complete a localhost smoke test before publishing this prerelease.

### Suggested release tag

`v0.2.0-mvp` (GitHub prerelease).

No tag or GitHub release with this name has been created as part of this documentation change.

## v0.1.0-foundation

**Published:** 2026-07-24  
**GitHub release:** [v0.1.0-foundation](https://github.com/derekables/Auto-Guardable/releases/tag/v0.1.0-foundation)

Established the initial engineering foundation:

- Project identity, mission, and product philosophy.
- Initial product requirements and architectural decisions.
- Browser-first, event-driven, local-first, and AI-provider-abstraction principles.
- Repository organization, component contracts, and engineering workflow.

The original release notes named a walking skeleton as the next milestone. Subsequent work created the initial TypeScript decision-pipeline scaffold; the later runnable MVP is documented as the proposed 0.2.0 milestone above.
