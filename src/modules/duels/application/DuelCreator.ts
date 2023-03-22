import { Id } from "../../shared/value-objects/domain/Id";
import { Duel } from "../domain/Duel";
import { DuelCreatorDto } from "../domain/DuelCreatorDto";
import { DuelRepository } from '../domain/DuelRepository';
import { EventBus } from '../../shared/event-bus/domain/EventBus';
import { DuelCreatedDomainEvent } from '../domain/DuelCreatedDomainEvent';

export class DuelCreator {
  private readonly duelRepository: DuelRepository
  private readonly eventBus: EventBus

  constructor(duelRepository: DuelRepository, eventBus: EventBus) {
    this.duelRepository = duelRepository
    this.eventBus = eventBus 
  }

  async run(payload: DuelCreatorDto) {
    const duel = Duel.create(
      new Id(payload.id),
      new Id(payload.eventId),
      payload.player,
      payload.matchType,
      payload.wins,
      payload.defeats,
      payload.playerWon,
      payload.opponentClan,
      payload.playerPoints,
      payload.opponentPoints,
      payload.playerClan,
      payload.opponent
    )

    await this.duelRepository.create(duel)

    this.eventBus.publish([new DuelCreatedDomainEvent(duel.toPrimitives())]);
  }
}