# ADR-0004: AI Provider Abstraction

## Status

Accepted

## Context

Auto-Guardable should not become dependent on a single AI provider. The system may eventually use local models, GitHub Models, OpenAI, or future providers.

To preserve flexibility, the rest of the codebase should not care which provider generated a response.

## Decision

Auto-Guardable will use a provider abstraction layer for AI capabilities.

All AI-dependent functionality will interact through a common interface, with provider-specific implementations hidden behind that boundary.

## Consequences

- The application can switch providers without major redesign.
- Local and cloud models can coexist behind the same interface.
- Provider-specific differences are isolated in adapter implementations.
- The system remains easier to test, compare, and evolve over time.
