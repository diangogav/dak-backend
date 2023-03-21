import { Duel } from "../../domain/Duel";
import { DuelRepository } from "../../domain/DuelRepository";
import { BaseMongooseRepository } from '../../../shared/db/infrastructure/mongodb/BaseMongooseRepository';
import DuelModel from './DuelModel';

export class DuelMongoRepository extends BaseMongooseRepository<Duel> implements DuelRepository {
  constructor() {
    super(DuelModel)
  }
}