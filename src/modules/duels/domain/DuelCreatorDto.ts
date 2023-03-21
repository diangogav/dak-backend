export class DuelCreatorDto {
  id!: string
  eventId!: string
  player!: string
  matchType!: number
  wins!: number
  defeats!: number
  playerWon!: boolean
  opponentClan!: string
  playerClan!: string
  opponent!: string
  playerPoints!: number
  opponentPoints!: number
}