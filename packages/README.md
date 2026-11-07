# Workspace Package Guide

## Current pnpm workspace packages

The workspace discovers `apps/*`, `packages/*`, and `services/*` directories that contain a package manifest.

Current packages:

- `@auto-guardable/ai`: AI observation provider interface, OpenAI Responses API adapter, and deterministic demo provider.
- `@auto-guardable/events`: initial TypeScript domain-event contract.
- `@auto-guardable/policy`: initial TypeScript policy contracts.
- `@auto-guardable/web`: browser dashboard and Node.js MVP server (under `apps/web`).

## Scaffold versus package

`packages/decision-pipeline` currently contains TypeScript source, a minimal orchestration placeholder, fixture material, and a walking-skeleton test. It does not yet contain a `package.json`, so it is not a separately declared pnpm workspace package. It is also not integrated into the runnable web MVP. Its orchestrator currently returns an `unimplemented` decision.

Do not describe this scaffold as a production package or as the runtime used by `apps/web` until it has a manifest, executable implementation, and workspace-integrated tests.

## Naming conventions

Use scoped package names to make ownership and purpose clear:

```text
@auto-guardable/<package-name>
```

Names should describe a capability, not a vendor or implementation. Provider-specific adapters belong inside the relevant package rather than defining the public package identity.

## Planned package boundaries

As implementation requires them, the architecture may add:

- `@auto-guardable/core`
- `@auto-guardable/camera`
- `@auto-guardable/speech`
- `@auto-guardable/shared`

Create these packages when a concrete implementation needs the boundary; their names are not evidence that the packages already exist.
