import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { DuelCreatedDomainEvent } from './DuelCreatedDomainEvent';
import { Id } from '../../shared/value-objects/domain/Id';
import { Uuid } from '../../shared/value-objects/domain/Uuid';

export class PlayerDuelStatistics extends AggregateRoot{
  readonly nickname: string;
  readonly id: Id;
  readonly eventId: Id;
  readonly wins: number;
  readonly defeats: number;
  readonly matchWins: number;
  readonly matchLosses: number;
  readonly matchesPlayed: number;

  constructor({
    nickname,
    wins,
    defeats,
    matchWins,
    matchLosses,
    matchesPlayed,
    eventId,
    id
  }: {
    id: Id;
    nickname: string;
    wins: number;
    defeats: number;
    matchWins: number;
    matchLosses: number;
    matchesPlayed: number;
    eventId: Id;
  }) {
    super();
    this.nickname = nickname;
    this.wins = wins;
    this.defeats = defeats;
    this.matchWins = matchWins;
    this.matchLosses = matchLosses;
    this.matchesPlayed = matchesPlayed;
    this.eventId = eventId
    this.id = id
  }

  static create(
    id: Id,
    nickname: string,
    wins: number,
    defeats: number,
    matchWins: number,
    matchLosses: number,
    matchesPlayed: number,
    eventId: Id,
  ): PlayerDuelStatistics {
    const playerStats = new PlayerDuelStatistics({
      id,
      nickname,
      wins,
      defeats,
      matchWins,
      matchLosses,
      matchesPlayed,
      eventId
    })

    return playerStats
  }

  static initialize(
    nickname: string,
    eventId: Id
  ): PlayerDuelStatistics {
    const playerStats = new PlayerDuelStatistics({
      id: new Id(Uuid.random().value),
      nickname,
      wins: 0,
      defeats: 0,
      matchWins: 0,
      matchLosses: 0,
      matchesPlayed: 0,
      eventId
    })

    return playerStats
  }

  toPrimitives(): { [key: string]: unknown; } {
    return {
      id: this.id.value,
      nickname: this.nickname,
      wins: this.wins,
      defeats: this.defeats,
      matchWins: this.matchWins,
      matchLosses: this.matchLosses,
      matchesPlayed: this.matchesPlayed,
      eventId: this.eventId.value
    };
  }

  static fromPrimitives({
    nickname,
    wins,
    defeats,
    matchWins,
    matchLosses,
    matchesPlayed,
    eventId,
    id
  }: {
    nickname: string
    wins: number
    defeats: number
    matchWins: number
    matchLosses: number
    matchesPlayed: number
    eventId: string
    id: string
  }): PlayerDuelStatistics {
    const playerDuelStats = new PlayerDuelStatistics({
      id: new Id(id),
      nickname,
      wins,
      defeats,
      matchWins,
      matchLosses,
      matchesPlayed,
      eventId: new Id(eventId),
    });

    return playerDuelStats;
  }

  addDuel(event: DuelCreatedDomainEvent) {
    const duel = event.data

    if(duel.eventId !== this.eventId.value) { return this }
    

    return PlayerDuelStatistics.create(
      this.id,
      this.nickname,
      this.wins + duel.wins,
      this.defeats + duel.defeats,
      ((duel.player === this.nickname && duel.playerWon) || (duel.opponent === this.nickname && duel.playerWon === false)) ? this.matchWins + 1 : this.matchWins,
      ((duel.opponent === this.nickname && duel.playerWon === false) || (duel.player === this.nickname && duel.playerWon === false)) ? this.matchLosses + 1 : this.matchLosses,
      this.matchesPlayed + 1,
      new Id(duel.eventId)
    )
  }
  
}