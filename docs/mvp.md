# Auto-Guardable MVP

## Status

The MVP is runnable from `apps/web`. It demonstrates an end-to-end, on-demand browser workflow. It is an engineering proof of the product loop, not a production-ready security system.

## Implemented runtime loop

Browser camera frame  
→ AI observation provider  
→ `PersonDetected` event  
→ deterministic policy evaluation  
→ `PolicyEvaluated` event  
→ optional `AnnouncementScheduled` event  
→ browser-native speech  
→ `AnnouncementPlayed` event  
→ local JSONL event log

The browser captures a frame only when the operator requests a scan. The server passes that image to the configured provider, records the normalized observation, and evaluates it using deterministic operating-hours and cooldown policy.

The AI provider is an observation component, not the decision authority. It must describe only visible content and must not infer identity, intent, criminality, danger, homelessness, intoxication, emotion, disability, or protected characteristics. The policy engine—not the model—decides whether to announce.

## MVP capabilities

- Browser camera input through `getUserMedia()`.
- On-demand frame capture and analysis.
- AI provider abstraction with an OpenAI Responses API adapter.
- Deterministic demo provider for testing without an API key.
- Normalized person observation with count, confidence, and summary.
- Configurable operating hours and after-hours announcement behavior.
- In-memory announcement cooldown.
- Browser-native speech output for approved announcements.
- Local JSONL event log.
- Dashboard for policy configuration, latest decision, and audit history.
- Localhost binding by default.

## Data handling and deployment boundary

- The app does not continuously stream frames to the model. A frame is captured when the operator clicks the scan action.
- With the live provider configured, the captured image is sent to the configured OpenAI-compatible Responses API endpoint. Review that provider's terms and data handling before using real camera feeds.
- The local JSONL log stores events and normalized observation data; the current implementation does not store the original camera frame.
- The default server host is `127.0.0.1`. There is no authentication or authorization layer. Do not bind it to a public or untrusted network.
- The cooldown timestamp is held in process memory and is lost on restart. The JSONL event history is local but is not a durable database.

## What is deliberately not MVP yet

- RTSP / ONVIF camera adapters.
- Continuous production-grade vision inference or event throttling.
- Local vision inference.
- Persistent incident state and cooldowns.
- Durable database storage, retention controls, and event replay.
- User authentication, authorization, or multi-tenant controls.
- Server-side text-to-speech or a replaceable speech service.
- Production deployment packaging, monitoring, and health management beyond the basic endpoint.
- Automated police or emergency escalation.
- Facial recognition, identity tracking, threat scoring, weapon detection, or autonomous physical intervention.

## Relationship to the decision-pipeline scaffold

The runnable application in `apps/web` currently implements its own JavaScript policy and event-log path. The TypeScript code under `packages/decision-pipeline` remains an architectural scaffold; its orchestrator returns an `unimplemented` decision and it is not wired into the web runtime. Do not describe the scaffold as powering the MVP until that integration exists.

## Final-product map

### Camera layer
Add RTSP/ONVIF/IP-camera adapters and a normalized observation stream.

### Vision layer
Move from on-demand AI inspection to a local-first vision service with configurable providers, event throttling, and explicit privacy controls.

### Event system
Promote the current JSONL log to a durable event store with retention, replay, filtering, and audit tooling.

### Policy engine
Add configurable rules, zones, grace periods, repeated-presence handling, schedules, authorized-access signals, and human review.

### Response coordinator
Track incidents as state machines rather than isolated events and prevent duplicate or conflicting actions.

### Speech service
Move from browser speech to a replaceable speech package supporting local TTS and optional cloud adapters.

### Browser dashboard
Add multi-camera views, incident timelines, configuration, health monitoring, and operator controls.

### Local-first deployment
Package the system for a small local appliance or VM, with cloud connectivity optional and clearly disclosed.

## Verification target

The intended checks are:

    pnpm lint
    pnpm test
    pnpm build

The latest push workflow for the current `main` commit failed before reporting any job steps, so a passing CI result is not yet established. After the runner/workflow failure is diagnosed, rerun these checks and add a manual localhost smoke test covering camera permission, demo simulation, policy save, announcement, event history, and reset.

Without an OpenAI key, the simulator and demo provider allow the architectural path to be exercised without external AI calls.
