import { Controller, Post, Route, Body, Get, Path } from "tsoa";
import { DuelCreator } from "../application/DuelCreator";
import { DuelCreatorDto } from "../domain/DuelCreatorDto";
import { DuelMongoRepository } from './mongodb/DuelMongoRepository';
import { DuelStatsByClanGetter } from '../application/DuelStatsByClanGetter';
import { ClanDuelStatistics } from "../domain/ClanDuelStatistics";

@Route("/v1/duels")
export class DuelsController extends Controller {
  @Post()
  async create(@Body() body: DuelCreatorDto) {
    const duelCreator = new DuelCreator(new DuelMongoRepository());
    await duelCreator.run(body);
    return {};
  }

  @Get("/event/{eventId}/clan/stats")
  async clanStats(@Path() eventId: string): Promise<ClanDuelStatistics[]> {
    const clanStatsGetter = new DuelStatsByClanGetter(
      new DuelMongoRepository()
    );
    const stats = await clanStatsGetter.run(eventId);
    return stats
  }
}