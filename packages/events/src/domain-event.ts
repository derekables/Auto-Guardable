export interface DomainEvent<T = unknown> {
  id: string;
  type: string;
  timestamp: Date;
  source: string;
  payload: T;
}
