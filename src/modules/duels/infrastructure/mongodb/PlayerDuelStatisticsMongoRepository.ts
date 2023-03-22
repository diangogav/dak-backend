import { BaseMongooseRepository } from '../../../shared/db/infrastructure/mongodb/BaseMongooseRepository';
import PlayerDuelStatisticsModel from "./PlayerDuelStatisticsModel";
import { PlayerDuelStatistics } from '../../domain/PlayerDuelStatistics';
import { PlayerDuelStatisticsRepository } from '../../domain/PlayerDuelStatisticsRepository';

export class PlayerDuelStatisticsMongoRepository extends BaseMongooseRepository<PlayerDuelStatistics> implements PlayerDuelStatisticsRepository {
  constructor() {
    super(PlayerDuelStatisticsModel)
  }

  async find(eventId: string, nickname: string): Promise<PlayerDuelStatistics | null> {
    const databaseResponse = await PlayerDuelStatisticsModel.findOne({
      eventId,
      nickname
    })

    if(!databaseResponse) { return null }

    return PlayerDuelStatistics.fromPrimitives({ ...databaseResponse.toObject() })
  }

  async get(eventId: string): Promise<PlayerDuelStatistics[]> {
    const databaseResponse = await PlayerDuelStatisticsModel.find({ eventId })
    return databaseResponse.map(item => PlayerDuelStatistics.fromPrimitives({ ...item.toObject() }))
  }
}