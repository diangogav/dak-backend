import { DomainEvent } from '../domain/DomainEvent'
import { DomainEventSubscriber } from '../domain/DomainEventSubscriber'
import { EventBus } from '../domain/EventBus'
import { EventEmitterBus } from '../EventEmitterBus'

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;
  private readonly subscribers: Array<DomainEventSubscriber<DomainEvent>>

  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.subscribers = subscribers || []
    this.bus = new EventEmitterBus(this.subscribers)
  }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events)
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers)
  }
}
