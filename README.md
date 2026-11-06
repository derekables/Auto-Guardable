# Auto-Guardable

Auto-Guardable is a browser-first, local-first property protection system designed to prioritize de-escalation, transparency, and human dignity.

## Mission

Auto-Guardable develops intelligent property protection systems that prioritize de-escalation, transparency, and respect. By combining modern computer vision, local AI, and natural speech, we help organizations protect their spaces while treating every person with dignity.

## MVP: now runnable

The first real runtime proves this loop:

Camera → AI observation → Policy → Respectful announcement → Local event log

The MVP lives in apps/web and uses:

- browser camera input;
- an OpenAI Responses API adapter behind the @auto-guardable/ai boundary;
- a deterministic policy engine;
- browser-native speech;
- a local JSONL audit log;
- a demo AI provider when no API key is configured.

See docs/mvp.md for the MVP/final-product map and docs/adr/ADR-0005-mvp-runtime.md for the runtime boundary.

## Run locally

Requirements: Node 22 and pnpm 10.

    pnpm install
    pnpm --filter @auto-guardable/web dev

Then open http://127.0.0.1:8787.

### Optional AI

To use real visual analysis instead of demo mode:

    OPENAI_API_KEY=your_key_here pnpm --filter @auto-guardable/web dev

The model can be selected with AUTOGUARD_AI_MODEL, and an OpenAI-compatible base URL can be supplied with OPENAI_BASE_URL.

The repository intentionally does not store credentials.

## Verification

    pnpm lint
    pnpm test
    pnpm build

## Architecture

See docs/ for the project vision, architecture, roadmap, ethics, requirements, API overview, UI philosophy, engineering workflow, and design tenets.

The architectural spine remains:

Observation Source
        ↓
Domain Event
        ↓
Policy Evaluation
        ↓
Decision
        ↓
Action Boundary

The MVP adds implementations behind those boundaries rather than replacing them.
