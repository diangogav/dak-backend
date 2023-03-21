import { Duel } from "../../domain/Duel";
import { DuelRepository } from "../../domain/DuelRepository";
import { BaseMongooseRepository } from '../../../shared/db/infrastructure/mongodb/BaseMongooseRepository';
import DuelModel from './DuelModel';
import { Id } from "../../../shared/value-objects/domain/Id";
import { ClanDuelStatistics } from '../../domain/ClanDuelStatistics';

export class DuelMongoRepository extends BaseMongooseRepository<Duel> implements DuelRepository {
  constructor() {
    super(DuelModel)
  }

  async clanStats(eventId: Id): Promise<ClanDuelStatistics[]> {
    const playerClanStats = await DuelModel.aggregate([
      {
        $match: { eventId: eventId.value }
      },
      {
        $group: {
          _id: '$playerClan',
          points: { $sum: '$playerPoints' },
          matchCount: { $sum: 1}
        }
      }
    ]).exec()

    const opponentClanStats = await DuelModel.aggregate([
      {
        $match: { eventId: eventId.value }
      },
      {
        $group: {
          _id: '$opponentClan',
          points: { $sum: '$opponentPoints' },
          matchCount: { $sum: 1}
        }
      }
    ]).exec()

    const playerClanNames = playerClanStats.map(clan => clan._id)
    const opponentClanNames = opponentClanStats.map(clan => clan._id)
    const clanNames = Array.from(
      new Set([...playerClanNames, ...opponentClanNames])
    );

    const clanStats = clanNames.map((name) => {
      const playerClanStat = playerClanStats.find(playerClan => playerClan._id === name)
      const opponentClanStat = opponentClanStats.find(opponentClan => opponentClan._id === name)
      const points = (playerClanStat?.points || 0) + (opponentClanStat?.points || 0)
      const matchCount = (playerClanStat?.matchCount || 0) + (opponentClanStat?.matchCount || 0)
      const average = (points / matchCount).toFixed(2)
      const missingDuels = 36 - matchCount
      const maxPointsAvailable =  (missingDuels * 6) + points
  
      return new ClanDuelStatistics({
        clan: name,
        points,
        matchCount,
        average,
        missingDuels,
        maxPointsAvailable
      })
    })

    return clanStats
  }
}