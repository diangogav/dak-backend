import { Duel } from "./Duel";
import { Id } from '../../shared/value-objects/domain/Id';
import { ClanDuelStatistics } from "./ClanDuelStatistics";

export interface DuelRepository {
  create(duel: Duel): Promise<void>
  clanStats(eventId: Id): Promise<ClanDuelStatistics[]>
  statisticsAgainstOpposingClans(clanName: string): Promise<unknown>
}