# Auto-Guardable Component Contracts

## Purpose

This document defines the boundaries between major Auto-Guardable components.

Components communicate through explicit contracts rather than direct implementation dependencies.

The goal is replaceability, testability, and long-term maintainability.

## Core Principle

Components should answer:

> What do I provide?

not:

> How does another component work internally?

## System Contract Overview

```
Camera
  |
  v
Observation Event
  |
  v
Event System
  |
  v
Policy Engine
  |
  v
Decision
  |
  v
Response Coordinator
  |
  v
Action Request
  |
  v
Speech Service
  |
  v
Announcement
  |
  v
Event Store
```

## Camera Contract

### Responsibility

Provide observations from supported camera sources.

### Output

Camera systems produce observation events such as:

```
PersonDetected
```

### Boundary

Camera systems do not determine:

- intent
- threat level
- response

## Event Contract

### Responsibility

Provide a common language between system components.

All meaningful observations and actions become events.

Example:

```typescript
DomainEvent {
  id: string
  type: string
  timestamp: Date
  source: string
  payload: unknown
}
```

## Policy Contract

### Responsibility

Evaluate context and determine an appropriate action.

Input:

```typescript
PolicyContext {
  event: DomainEvent
  location: LocationContext
  configuration: PolicyConfiguration
}
```

Output:

```typescript
PolicyDecision {
  action: string
  confidence: number
  explanation: string
}
```

The policy engine does not:

- access cameras
- generate speech
- send notifications

## Response Contract

### Responsibility

Manage execution of approved decisions.

Input:

```typescript
ActionRequest {
  action: string
  reason: string
}
```

Output:

```typescript
ActionResult {
  status: string
  timestamp: Date
}
```

## Speech Contract

### Responsibility

Convert approved announcements into delivered communication.

Input:

```typescript
Announcement {
  text: string
  voice: string
}
```

Output:

```typescript
AnnouncementResult {
  delivered: boolean
  timestamp: Date
}
```

Speech does not decide what should be communicated.

## AI Provider Contract

### Responsibility

Allow multiple AI implementations without changing application logic.

Example interface:

```typescript
AIProvider {
  generate(request): Response
}
```

Possible implementations include:

- local models
- cloud providers
- future providers

## Storage Contract

### Responsibility

Persist system history and operational records.

Storage implementations should remain replaceable.

Examples:

Development:

```
SQLite
```

Production:

```
PostgreSQL
```

## Contract Rules

All contracts should:

- use explicit schemas
- be versionable
- be testable
- avoid leaking implementation details
- support replacement
