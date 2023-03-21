import { DuelRepository } from "../domain/DuelRepository"
import { Id } from '../../shared/value-objects/domain/Id';
import { ClanDuelStatistics } from "../domain/ClanDuelStatistics";

export class DuelStatsByClanGetter {
  private readonly duelRepository: DuelRepository

  constructor(duelRepository: DuelRepository) {
    this.duelRepository = duelRepository
  }

  async run(eventId: string): Promise<ClanDuelStatistics[]> {
    return this.duelRepository.clanStats(new Id(eventId))
  }
}