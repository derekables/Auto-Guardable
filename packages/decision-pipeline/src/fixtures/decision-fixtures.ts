import type { Decision } from '../decision';

export const createDecisionFixture = (
  overrides: Partial<Decision> = {},
): Decision => ({
  id: 'fixture-decision',
  type: 'fixture',
  confidence: 1,
  metadata: {
    source: 'test-fixture',
  },
  ...overrides,
});
