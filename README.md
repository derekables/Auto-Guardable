# Auto-Guardable

**Repository version:** `0.2.0` (root `package.json`)  
**Release status:** `v0.1.0-foundation` is published. The `0.2.0` runnable-MVP milestone is prepared but has not yet been tagged or published. See [CHANGELOG.md](CHANGELOG.md).

Auto-Guardable is a browser-first, local-first property protection system designed to prioritize de-escalation, transparency, and human dignity.

## Mission

Auto-Guardable develops intelligent property protection systems that prioritize de-escalation, transparency, and respect. By combining computer vision, AI-assisted observation, and natural speech, we help organizations protect their spaces while treating every person with dignity.

## Current milestone: runnable MVP

The first runnable MVP demonstrates this on-demand loop:

Camera frame → AI observation → deterministic policy → respectful announcement → local event log

The implementation lives in `apps/web` and includes:

- browser camera capture through `getUserMedia()`;
- on-demand frame analysis through an AI-provider boundary;
- an OpenAI Responses API adapter and a deterministic demo provider;
- deterministic operating-hours and announcement-cooldown policy;
- browser-native speech for approved announcements;
- a local JSONL event log;
- a dashboard for observation, policy configuration, decisions, and audit history.

The AI is advisory. It may describe visible observations; deterministic application policy decides whether an announcement is appropriate.

See [docs/mvp.md](docs/mvp.md), [docs/engineering-handoff.md](docs/engineering-handoff.md), and [docs/adr/ADR-0005-mvp-runtime.md](docs/adr/ADR-0005-mvp-runtime.md).

## Run locally

Requirements: Node 22 and pnpm 10.

    pnpm install
    pnpm --filter @auto-guardable/web dev

Then open http://127.0.0.1:8787.

### Optional live AI

To use live visual analysis instead of demo mode:

    OPENAI_API_KEY=your_key_here pnpm --filter @auto-guardable/web dev

The model can be selected with `AUTOGUARD_AI_MODEL`, and an OpenAI-compatible base URL can be supplied with `OPENAI_BASE_URL`.

The repository intentionally does not store credentials. Without an API key, the demo provider allows the pipeline to be exercised without calling an external AI service.

## Verification

    pnpm lint
    pnpm test
    pnpm build

The latest push workflow for the current `main` commit failed before reporting any job steps. A passing CI result has therefore **not** yet been established for this milestone. See the verification note in [CHANGELOG.md](CHANGELOG.md).

## Important MVP boundaries

This is an engineering MVP, not a production-ready security deployment.

- Camera scans are on demand, not continuous.
- RTSP/ONVIF adapters, durable incident state, authentication, multi-property tenancy, and production deployment packaging are not implemented.
- The server binds to `127.0.0.1` by default and has no authentication. Do not expose it to an untrusted network.
- When the live OpenAI-compatible provider is configured, each explicitly submitted camera frame is sent to that configured API endpoint for analysis. The local event log records event and observation data, not the original frame.
- Announcement cooldown state is held in process memory and resets when the server restarts.

## Architecture

The long-term architectural spine is:

Observation Source  
↓  
Domain Event  
↓  
Policy Evaluation  
↓  
Decision  
↓  
Action Boundary

The MVP proves a practical vertical slice in `apps/web`. The separate TypeScript decision-pipeline scaffold is not yet wired into that runtime; see [docs/architecture/decision-pipeline.md](docs/architecture/decision-pipeline.md).

The architecture should gain capabilities by adding implementations behind explicit boundaries, not by making the MVP appear more complete than it is.
