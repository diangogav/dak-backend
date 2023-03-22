import { PlayerDuelStatistics } from './PlayerDuelStatistics';

export interface PlayerDuelStatisticsRepository {
  create(stats: PlayerDuelStatistics): Promise<void>;
  update(id: string, stats: PlayerDuelStatistics): Promise<void>;
  find(eventId: string, nickname: string): Promise<PlayerDuelStatistics | null>;
  get(eventId: string): Promise<PlayerDuelStatistics[]>;
}