import { PlayerDuelStatisticsRepository } from "../domain/PlayerDuelStatisticsRepository";

export class PlayerDuelsStatisticsGetter {
  private readonly playerDuelsStatisticsRepository: PlayerDuelStatisticsRepository;

  constructor(playerDuelsStatisticsRepository: PlayerDuelStatisticsRepository) {
    this.playerDuelsStatisticsRepository = playerDuelsStatisticsRepository;
  }

  async run(eventId: string): Promise<unknown> {
    const stats = await this.playerDuelsStatisticsRepository.get(eventId);
    return stats.map(item => item.toPrimitives())
  }
}