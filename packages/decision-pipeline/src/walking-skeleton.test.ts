import type { Decision } from './decision';
import type { PolicyDecisionAdapter } from './policy-adapter';
import { BasicDecisionPipeline } from './orchestrator';

/**
 * Walking skeleton proof.
 *
 * This documents the intended flow without introducing production behavior.
 */
describe('decision pipeline walking skeleton', () => {
  it('moves a policy result toward a decision output', async () => {
    const adapter: PolicyDecisionAdapter = {
      async adapt(): Promise<Decision> {
        return {
          id: 'test-decision',
          type: 'test',
        };
      },
    };

    const pipeline = new BasicDecisionPipeline();
    const policyResult = await adapter.adapt({ event: 'test-event' });

    const result = await pipeline.evaluate(policyResult);

    expect(result.type).toBe('unimplemented');
  });
});
