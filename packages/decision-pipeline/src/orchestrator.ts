import type { Decision } from './decision';
import type { DecisionPipeline } from './pipeline';

/**
 * Minimal orchestration layer for the decision pipeline.
 *
 * This intentionally coordinates flow only. It does not execute actions,
 * invoke external services, or contain policy logic.
 */
export class BasicDecisionPipeline implements DecisionPipeline {
  async evaluate(input: unknown): Promise<Decision> {
    return {
      id: crypto.randomUUID(),
      type: 'unimplemented',
      metadata: {
        input,
      },
    };
  }
}
