export interface Decision {
  id: string;
  type: string;
  confidence?: number;
  metadata?: Record<string, unknown>;
}
