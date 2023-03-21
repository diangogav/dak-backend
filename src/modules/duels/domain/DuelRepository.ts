import { Duel } from "./Duel";

export interface DuelRepository {
  create(duel: Duel): Promise<void>
}