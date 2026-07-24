# Package Naming Conventions

Auto-Guardable packages use scoped names to make ownership and purpose clear.

Recommended format:

```text
@auto-guardable/<package-name>
```

Examples:

- `@auto-guardable/core`
- `@auto-guardable/events`
- `@auto-guardable/policy`
- `@auto-guardable/ai`
- `@auto-guardable/camera`
- `@auto-guardable/speech`
- `@auto-guardable/shared`

## Naming Rules

- Package names should describe capability, not implementation.
- Names should remain stable as implementations change.
- Infrastructure details should not leak into public package names.

Example:

Preferred:

```text
@auto-guardable/speech
```

Not preferred:

```text
@auto-guardable/elevenlabs-adapter
```

Adapters belong inside packages and should not define the architecture.
