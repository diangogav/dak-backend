import { DuelRepository } from "../domain/DuelRepository"

export class StatisticsAgainstOpposingClans {
  private readonly duelRepository: DuelRepository

  constructor(duelRepository: DuelRepository) {
    this.duelRepository = duelRepository
  }

  async run(clanName: string): Promise<unknown> {
    return this.duelRepository.statisticsAgainstOpposingClans(clanName)
  }
}