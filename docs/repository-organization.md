# Auto-Guardable Repository Organization

## Purpose

This document defines the structure of the Auto-Guardable repository.

The repository uses a monorepo approach designed to support multiple applications, services, shared libraries, and future products while maintaining clear ownership boundaries.

## Repository Layout

```text
.github/
    workflows/

 docs/
    adr/
    architecture.md
    vision.md
    roadmap.md
    ethics.md
    requirements.md
    api.md
    ui.md
    principles.md
    design-tenets.md
    system-design.md
    data-flow.md

apps/
    web/

packages/
    core/
    policy/
    ai/
    camera/
    speech/
    events/
    shared/

services/
    vision/

scripts/

tests/

examples/

assets/
```

## Top-Level Responsibilities

## `.github`

Contains repository automation and collaboration configuration:

- CI workflows
- issue templates
- pull request templates
- repository configuration

## `docs`

Contains engineering knowledge and product documentation.

Documentation is considered part of the product.

This includes:

- architectural decisions
- requirements
- design principles
- API documentation
- operational knowledge

## `apps`

Contains user-facing applications.

Initial application:

```text
apps/web
```

The browser dashboard.

Future applications may include additional administration or client experiences.

## `packages`

Contains reusable libraries and shared capabilities.

Packages should be independently understandable, loosely coupled, and reusable.

### `core`

Contains fundamental domain concepts and common abstractions.

Should avoid infrastructure dependencies.

### `policy`

Contains decision models and policy evaluation logic.

Should not depend directly on cameras, speech providers, or deployment details.

### `ai`

Contains AI provider interfaces and adapters.

The rest of the system should not depend on a single AI vendor.

### `camera`

Contains camera abstractions, connection interfaces, and stream-related contracts.

### `speech`

Contains speech interfaces and announcement delivery abstractions.

### `events`

Contains event definitions, schemas, and event contracts.

This package supports the event-driven architecture.

### `shared`

Contains shared types, validation schemas, and common utilities.

## `services`

Contains independently deployable processes.

Initial service:

```text
services/vision
```

Responsible for computer vision processing and producing observations/events.

## `tests`

Contains automated tests, integration tests, and system validation.

Testing structure should mirror system structure.

## `scripts`

Contains developer tooling such as setup helpers, migration utilities, and maintenance scripts.

## `examples`

Contains sample configurations, demonstrations, and educational material.

## `assets`

Contains project resources such as diagrams and documentation media.

## Organization Principles

The repository follows these rules:

### Separation of Concerns

Components should have clear responsibilities and ownership.

### Dependencies Flow Inward

Outer systems should depend on inner abstractions rather than the reverse.

### Documentation First

Important decisions belong in the repository.

### Replaceability

Components should be replaceable without requiring redesign of the entire system.
