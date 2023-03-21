import { Id } from "../../shared/value-objects/domain/Id";
import { AggregateRoot } from '../../shared/domain/AggregateRoot';

export class Duel extends AggregateRoot {
  readonly id: Id
  readonly eventId: Id
  readonly player: string
  readonly matchType: number
  readonly wins: number
  readonly defeats: number
  readonly playerWon: boolean
  readonly opponentClan: string
  readonly playerPoints: number
  readonly opponentPoints: number
  readonly playerClan: string
  readonly opponent: string

  constructor(
    id: Id,
    eventId: Id,
    player: string,
    matchType: number,
    wins: number,
    defeats: number,
    playerWon: boolean,
    opponentClan: string,
    playerPoints: number,
    opponentPoints: number,
    playerClan: string,
    opponent: string
  ) {
    super()
    this.id = id
    this.eventId = eventId
    this.player = player
    this.matchType = matchType
    this.wins = wins
    this.defeats = defeats
    this.playerWon = playerWon
    this.opponentClan = opponentClan
    this.playerPoints = playerPoints
    this.opponentPoints = opponentPoints
    this.playerClan = playerClan
    this.opponent = opponent
  }

  static create(
    id: Id, 
    eventId: Id, 
    player: string,
    matchType: number,
    wins: number,
    defeats: number,
    playerWon: boolean,
    opponentClan: string,
    playerPoints: number,
    opponentPoints: number,
    playerClan: string,
    opponent: string
  ) {
    const duel = new Duel(
      id,
      eventId,
      player,
      matchType,
      wins,
      defeats,
      playerWon,
      opponentClan,
      playerPoints,
      opponentPoints,
      playerClan,
      opponent
    )

    return duel
  }

  static fromPrimitives() {}

  toPrimitives() {
    return {
      id: this.id.value,
      eventId: this.eventId.value,
      player: this.player,
      matchType: this.matchType,
      wins: this.wins,
      defeats: this.defeats,
      playerWon: this.playerWon,
      opponentClan: this.opponentClan,
      playerPoints: this.playerPoints,
      opponentPoints: this.opponentPoints,
      playerClan: this.playerClan,
      opponent: this.opponent
    };
  }
}