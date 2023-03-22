import { DomainEventClass } from "../../shared/event-bus/domain/DomainEvent";
import { DomainEventSubscriber } from "../../shared/event-bus/domain/DomainEventSubscriber"
import { DuelCreatedDomainEvent } from '../domain/DuelCreatedDomainEvent';
import { PlayerDuelStatisticsRepository } from "../domain/PlayerDuelStatisticsRepository";
import { PlayerDuelStatistics } from '../domain/PlayerDuelStatistics';
import { Id } from "../../shared/value-objects/domain/Id";

export class StatsUpdaterOnDuelCreated
  implements DomainEventSubscriber<DuelCreatedDomainEvent>
{
  private readonly playerDuelsStatisticsRepository: PlayerDuelStatisticsRepository;

  constructor(playerDuelsStatisticsRepository: PlayerDuelStatisticsRepository) {
    this.playerDuelsStatisticsRepository = playerDuelsStatisticsRepository;
  }

  subscribedTo(): DomainEventClass[] {
    return [DuelCreatedDomainEvent];
  }

  async on(domainEvent: DuelCreatedDomainEvent) {
    if (
      domainEvent.data.playerClan !== "DAK" &&
      domainEvent.data.opponentClan !== "DAK"
    ) {
      return;
    }

    const nickname = domainEvent.data.playerClan === 'DAK' ? domainEvent.data.player : domainEvent.data.opponent 
    const currentStats = await this.getCurrentStats(
      domainEvent.data.eventId,
      nickname
    );

    const stats = currentStats.addDuel(domainEvent)
    await this.playerDuelsStatisticsRepository.update(stats.id.value, stats)
  }

  private async getCurrentStats(eventId: string, nickname: string) {
    const stats = await this.playerDuelsStatisticsRepository.find(
      eventId,
      nickname
    );

    if (!stats) {
      return PlayerDuelStatistics.initialize(nickname, new Id(eventId));
    }

    return stats
  }
}