# Auto-Guardable Engineering Handoff

## Purpose

This document captures the current architectural and runtime state of Auto-Guardable so future work can continue without relying on historical conversation context.

## Current state

Auto-Guardable has moved beyond the foundation-only phase.

The repository now contains a runnable MVP path:

Browser Camera
      ↓
AI Observation Provider
      ↓
Policy Evaluation
      ↓
Decision
      ↓
Browser Speech
      ↓
Local Event Log

### Implemented

- component boundaries and domain contracts
- monorepo tooling
- domain event model
- policy decision boundary
- decision-pipeline package
- browser-first MVP dashboard
- camera capture through getUserMedia()
- AI provider abstraction
- OpenAI Responses API adapter
- deterministic after-hours policy
- browser speech adapter
- local JSONL audit log
- basic CI
- no-key demo and simulation mode

### Not implemented yet

- RTSP / ONVIF camera adapters
- continuous production vision service
- local vision inference
- durable database storage
- authentication and multi-tenant controls
- server-side speech
- multi-zone incident state machines
- production deployment packaging

## Architectural rule

AI must remain advisory to safety-critical policy. The provider may report visible observations, but deterministic policy decides whether an action is appropriate.

## Next milestone

The next meaningful milestone is a second adapter behind the existing boundaries, not a rewrite of the core.

Preferred sequence:

1. RTSP/ONVIF observation adapter
2. incident state and cooldown persistence
3. replaceable speech package
4. local vision provider
5. operator authentication
6. production deployment packaging

## Verification target

A contribution is complete when it has:

- implementation
- focused tests
- documentation appropriate to its scope
- an understandable failure mode
- no unnecessary architectural coupling
