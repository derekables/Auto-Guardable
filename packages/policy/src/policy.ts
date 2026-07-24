import type { DomainEvent } from "@auto-guardable/events";
import type { PolicyDecision } from "./policy-decision";

export interface Policy<TPayload = unknown> {
  id: string;
  name: string;
  evaluate(event: DomainEvent<TPayload>): PolicyDecision;
}
