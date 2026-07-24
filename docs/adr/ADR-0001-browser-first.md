# ADR-0001: Browser-First Architecture

## Status

Accepted

## Context

Auto-Guardable is intended to be administered in a browser rather than a dedicated desktop application. The system should be approachable from standard browsers on local networks and should avoid unnecessary client installation overhead.

A browser-first approach lowers friction for administrators, makes the system easier to deploy and support, and fits the project's local-first and modular goals.

## Decision

The administrative and operational interface for Auto-Guardable will be browser-first.

Normal administration should be possible from a web UI accessible at a local hostname or local IP address, such as `http://autoguard.local` or `http://<local-ip>`.

## Consequences

- The web application becomes the primary user interface.
- Backend services must expose browser-friendly APIs and real-time updates.
- The system should be designed for local network access and simple deployment.
- Dedicated desktop software is not required for normal administration.
