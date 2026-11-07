# Auto-Guardable Repository Organization

## Purpose

This document describes the repository as it exists today and separates implemented paths from planned architecture. The repository uses a pnpm workspace intended to support multiple applications and reusable packages while maintaining clear ownership boundaries.

## Current repository layout

```text
.github/
  ISSUE_TEMPLATE/
  workflows/
  pull_request_template.md

apps/
  web/
    public/
    src/

docs/
  adr/
  architecture/

packages/
  ai/
  decision-pipeline/   # TypeScript scaffold; not a workspace package yet
  events/
  policy/

package.json
pnpm-workspace.yaml
turbo.json
tsconfig.json
.nvmrc
README.md
CHANGELOG.md
```

The pnpm workspace currently includes `apps/*`, `packages/*`, and `services/*`. A directory under `packages` is only a pnpm package when it has a package manifest. In particular, `packages/decision-pipeline` currently has no `package.json` and is not independently discovered as a workspace package.

## Top-level responsibilities

## `.github`

Contains repository automation and collaboration configuration:

- CI workflows
- issue templates
- pull request templates

## `docs`

Contains engineering knowledge and product documentation:

- architectural decision records
- requirements and product direction
- data-flow and system-design documentation
- development workflow and engineering handoff

Documentation is part of the product and should describe actual implementation status, not only the intended architecture.

## `apps`

Contains user-facing applications.

Current application:

- `apps/web`: browser dashboard and Node.js server for the runnable MVP.

## `packages`

Contains reusable libraries and package-level abstractions.

Current workspace packages:

- `@auto-guardable/ai`: provider interface, OpenAI Responses API adapter, and demo provider.
- `@auto-guardable/events`: initial TypeScript domain-event contract.
- `@auto-guardable/policy`: initial TypeScript policy contracts.

Scaffold directory:

- `packages/decision-pipeline`: decision and orchestration TypeScript scaffold. It lacks a package manifest, is not wired into `apps/web`, and currently returns an `unimplemented` decision.

## Planned areas

The following areas are part of the longer-term architecture but are not currently present as implemented directories/packages:

- camera adapters and RTSP/ONVIF support;
- speech package and server-side/local TTS;
- shared/core packages;
- independently deployed services such as a vision service;
- scripts, examples, assets, and a dedicated integration-test tree.

Create these paths when there is concrete implementation to own; do not document them as existing repository contents in the meantime.

## Organization principles

### Separation of concerns

Components should have clear responsibilities and ownership.

### Dependencies flow inward

Outer systems should depend on inner abstractions rather than the reverse.

### Documentation first

Important decisions belong in the repository and should be updated alongside the behavior they describe.

### Replaceability

Components should be replaceable without requiring redesign of the entire system.
