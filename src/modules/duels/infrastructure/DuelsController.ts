import { Controller, Post, Route, Body, Get, Path } from "tsoa";
import { DuelCreator } from "../application/DuelCreator";
import { DuelCreatorDto } from "../domain/DuelCreatorDto";
import { DuelMongoRepository } from './mongodb/DuelMongoRepository';
import { DuelStatsByClanGetter } from '../application/DuelStatsByClanGetter';
import { ClanDuelStatistics } from "../domain/ClanDuelStatistics";
import { StatisticsAgainstOpposingClans } from "../application/StatisticsAgainstOpposingClans";
import container from '../../../dependency-injection/index';
import { PlayerDuelsStatisticsGetter } from '../application/PlayerDuelsStatisticsGetter';
import { PlayerDuelStatisticsMongoRepository } from './mongodb/PlayerDuelStatisticsMongoRepository';

@Route("/v1/duels")
export class DuelsController extends Controller {
  @Post()
  async create(@Body() body: DuelCreatorDto) {
    const eventBus = container.get('Shared.EventBus')
    const duelCreator = new DuelCreator(new DuelMongoRepository(), eventBus);
    await duelCreator.run(body);
    return {};
  }

  @Get("/event/{eventId}/clan/stats")
  async clanStats(@Path() eventId: string): Promise<ClanDuelStatistics[]> {
    const clanStatsGetter = new DuelStatsByClanGetter(
      new DuelMongoRepository()
    );
    const stats = await clanStatsGetter.run(eventId);
    return stats;
  }

  @Get("/players/stats/event/{eventId}")
  async playerStatistics(
    @Path() eventId: string,
  ) {
    const playersStatistics = new PlayerDuelsStatisticsGetter(
      new PlayerDuelStatisticsMongoRepository()
    );
    const stats = await playersStatistics.run(eventId);
    return stats;
  }

  @Get("/event/{eventId}/clan/{clanName}/stats/against-opposing-clans")
  async statisticsAgainstOpposingClans(
    @Path() eventId: string,
    @Path() clanName: string
  ) {
    const clanStatsGetter = new StatisticsAgainstOpposingClans(
      new DuelMongoRepository()
    );
    const stats = await clanStatsGetter.run(clanName);
    return stats;
  }
}