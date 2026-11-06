# Auto-Guardable MVP

## The first real product

The MVP proves the complete safety-oriented loop:

Browser camera
→ AI observation
→ deterministic policy
→ respectful response
→ browser speech
→ local event log

The AI is an advisor to the system, not the authority. It may describe visible observations, but the deterministic policy engine decides whether an announcement is appropriate.

## MVP capabilities

- Browser-first camera input through getUserMedia()
- On-demand frame capture
- OpenAI Responses API provider behind an AI abstraction
- Demo provider that works without an API key
- Person observation with count, confidence, and summary
- Configurable operating hours
- Respectful after-hours announcement policy
- Browser-native speech output
- Local JSONL event log
- Dashboard showing decisions and audit history
- Safe localhost binding by default

## What is deliberately not MVP yet

- RTSP / ONVIF camera adapters
- Continuous production-grade vision inference
- Persistent user authentication
- Multi-property tenancy
- PostgreSQL
- Native server-side text-to-speech
- Automated police or emergency escalation
- Facial recognition or identity tracking
- Threat scoring
- Weapon detection
- Fully autonomous physical intervention

## Final-product map

### Camera layer
Add RTSP/ONVIF/IP-camera adapters and a normalized observation stream.

### Vision layer
Move from on-demand AI inspection to a local-first vision service with configurable providers and event throttling.

### Event system
Promote the current JSONL store to a durable event store with retention, replay, filtering, and audit tooling.

### Policy engine
Add configurable rules, zones, grace periods, repeated-presence handling, schedules, authorized-access signals, and human review.

### Response coordinator
Track incidents as state machines rather than isolated events and prevent duplicate or conflicting actions.

### Speech service
Move from browser speech to a replaceable speech package supporting local TTS and optional cloud adapters.

### Browser dashboard
Add multi-camera views, incident timelines, configuration, health monitoring, and operator controls.

### Local-first deployment
Package the system for a small local appliance or VM and keep cloud connectivity optional.

## Verification target

The MVP is considered functionally alive when a user can:

1. open the dashboard on localhost;
2. start a browser camera;
3. scan a frame;
4. receive an observation;
5. see a policy decision;
6. hear the approved announcement when the property is closed;
7. see the full chain in the event log.

Without an OpenAI key, the simulator and demo provider are intentionally available so the architectural pipeline can be tested end-to-end before API credentials are configured.
