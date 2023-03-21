import { Controller, Post, Route, Body } from "tsoa";
import { DuelCreator } from "../application/DuelCreator";
import { DuelCreatorDto } from "../domain/DuelCreatorDto";
import { DuelMongoRepository } from './mongodb/DuelMongoRepository';

@Route('/v1/duels')
export class DuelsController extends Controller {
  @Post()
  async create(
    @Body() body: DuelCreatorDto,
  ) {
    const duelCreator = new DuelCreator(new DuelMongoRepository())
    await duelCreator.run(body)
    return {}
  }
}