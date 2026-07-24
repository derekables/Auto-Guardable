import type { Decision } from './decision';

export interface DecisionPipeline {
  evaluate(input: unknown): Promise<Decision>;
}
