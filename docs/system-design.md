# Auto-Guardable System Design

## Overview

Auto-Guardable is an event-driven property protection platform.

The system observes situations, evaluates context, selects appropriate responses, communicates clearly, and records outcomes.

The architecture is designed around replaceable subsystems connected through explicit interfaces.

## Core Pipeline

```
Camera Source
    ↓
Vision Service
    ↓
Event System
    ↓
Policy Engine
    ↓
Response Coordinator
    ↓
Speech Service
    ↓
Event Store
    ↓
Browser Dashboard
```

## Component Responsibilities

### Camera Layer

Responsible for:

- connecting to camera sources
- receiving video input
- normalizing camera data

Not responsible for making policy decisions.

### Vision Service

Responsible for:

- processing visual input
- identifying relevant observations
- creating events

The vision layer should not determine intent or threat level.

### Event System

Responsible for:

- transporting events
- decoupling services
- supporting future sensors

All meaningful observations should become events.

### Policy Engine

Responsible for:

- evaluating context
- applying configured rules
- selecting responses

The policy engine determines what should happen, not how individual components perform actions.

### Response Coordinator

Responsible for:

- managing response workflows
- tracking state
- preventing duplicate actions

### Speech Service

Responsible for:

- producing spoken announcements
- delivering approved responses

It does not decide policy.

### Event Store

Responsible for:

- audit history
- troubleshooting
- accountability

### Browser Dashboard

Responsible for:

- administration
- configuration
- visibility

## Architectural Principles

Every subsystem should:

- have a clear responsibility
- communicate through contracts
- be replaceable
- fail safely
- remain understandable
