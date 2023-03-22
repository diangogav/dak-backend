import { DomainEvent } from "../../shared/event-bus/domain/DomainEvent";

export class DuelCreatedDomainEvent extends DomainEvent {
  static EVENT_NAME = "DUEL_CREATED";

  public readonly data: {
    id: string;
    eventId: string;
    player: string;
    matchType: number;
    wins: number;
    defeats: number;
    playerWon: boolean;
    opponentClan: string;
    playerPoints: number;
    opponentPoints: number;
    playerClan: string;
    opponent: string;
   };

  constructor(data: { 
    id: string;
    eventId: string;
    player: string;
    matchType: number;
    wins: number;
    defeats: number;
    playerWon: boolean;
    opponentClan: string;
    playerPoints: number;
    opponentPoints: number;
    playerClan: string;
    opponent: string;
   }) {
    super({
      eventName: DuelCreatedDomainEvent.EVENT_NAME,
    });
    this.data = data;
  }
}