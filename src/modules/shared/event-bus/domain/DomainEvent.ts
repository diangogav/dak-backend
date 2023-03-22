import { Uuid } from "../../value-objects/domain/Uuid";

export abstract class DomainEvent {
  static EVENT_NAME: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string

  constructor({ eventId, occurredOn, eventName }: { eventId?: string; occurredOn?: Date; eventName: string }) {
    this.eventName = eventName
    this.eventId = eventId || Uuid.random().value
    this.occurredOn = occurredOn || new Date()
  }
}

export type DomainEventClass = { EVENT_NAME: string };
