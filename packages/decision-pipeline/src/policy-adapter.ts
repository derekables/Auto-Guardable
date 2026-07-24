import type { Decision } from './decision';

/**
 * Boundary adapter between policy evaluation and decision output.
 *
 * This layer translates policy results into pipeline decisions.
 * It does not own policy rules or execute actions.
 */
export interface PolicyDecisionAdapter {
  adapt(policyResult: unknown): Promise<Decision>;
}
