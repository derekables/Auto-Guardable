# Auto-Guardable Engineering Workflow

## Purpose

This document defines how engineers collaborate while building Auto-Guardable.

The goal is to make changes incremental, reviewable, understandable, and safe.

## Development Philosophy

Every change should answer:

1. Why is this needed?
2. What problem does it solve?
3. How does it fit the architecture?
4. How can it be verified?

## Branch Strategy

The main branch represents the stable product foundation.

Direct commits to main should be avoided. Meaningful changes should occur through pull requests.

Recommended branch categories:

```
main
 |
 ├── feature/*
 ├── fix/*
 ├── docs/*
 └── chore/*
```

Examples:

- feature/policy-engine
- fix/event-retry-bug
- docs/api-contracts
- chore/update-dependencies

## Commit Standards

Auto-Guardable uses Conventional Commits.

Format:

```
type(scope): description
```

Examples:

- feat(policy): add rule evaluation interface
- fix(camera): handle disconnected stream
- docs(architecture): clarify event boundaries
- chore(ci): update workflow dependencies

Recommended commit types:

- feat
- fix
- docs
- chore
- refactor
- test
- perf
- security

## Pull Request Standards

Pull requests should explain:

### Summary

What changed?

### Motivation

Why was this change needed?

### Design

How does it fit the system?

### Testing

How was it verified?

### Risks

What could fail or require attention?

## Small Pull Request Philosophy

Prefer multiple focused pull requests over large, difficult-to-review changes.

Benefits:

- easier review
- clearer history
- safer rollback
- reduced risk

## Definition of Done

A change is complete when:

### Code

- implementation is complete
- tests exist where appropriate
- quality checks pass

### Architecture

- existing boundaries are respected
- unnecessary coupling is avoided

### Documentation

- behavior is documented
- architectural decisions are recorded when needed

### Review

- pull request feedback is addressed
- changes are understandable to future contributors
