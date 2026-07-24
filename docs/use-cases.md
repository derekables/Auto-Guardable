# Auto-Guardable Product Use Cases

## Purpose

This document describes representative situations Auto-Guardable is designed to handle.

These examples define expected behavior without prescribing implementation details.

## Use Case: Closed Property Visitor

### Scenario

A person enters a property outside approved operating hours.

### Expected System Behavior

```
Camera detects activity
        ↓
System creates event
        ↓
Policy evaluates context
        ↓
Appropriate response is selected
        ↓
Respectful announcement is delivered
        ↓
Event is recorded
```

### Desired Outcome

The person understands the situation and leaves voluntarily without unnecessary escalation.

---

## Use Case: Repeated Presence After Notice

### Scenario

A person remains after receiving an initial announcement.

### Expected System Behavior

The system should:

- record previous interaction history
- evaluate the updated context
- apply the configured escalation policy
- continue communicating clearly

Escalation should be proportional and explainable.

---

## Use Case: Authorized Access

### Scenario

A person is detected in an area where access is expected.

### Expected System Behavior

The system should avoid unnecessary intervention.

Detection alone should not automatically imply a threat.

---

## Use Case: System Failure

### Scenario

A camera, network connection, or service component fails.

### Expected System Behavior

The system should:

- identify the failure
- record useful diagnostic information
- fail safely
- avoid creating misleading alerts

---

## Guiding Principle

Every interaction should answer one question:

> Does this response protect the property while respecting the person involved?
