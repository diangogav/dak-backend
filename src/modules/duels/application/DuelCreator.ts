import { Id } from "../../shared/value-objects/domain/Id";
import { Duel } from "../domain/Duel";
import { DuelCreatorDto } from "../domain/DuelCreatorDto";
import { DuelRepository } from '../domain/DuelRepository';

export class DuelCreator {
  private readonly duelRepository: DuelRepository

  constructor(duelRepository: DuelRepository) {
    this.duelRepository = duelRepository
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
  }
}