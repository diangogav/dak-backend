export class ClanDuelStatistics {
  readonly clan: string;
  readonly points: number;
  readonly matchCount: number;
  readonly average: string;
  readonly missingDuels: number;
  readonly maxPointsAvailable: number;

  constructor({
    clan,
    points,
    matchCount,
    average,
    missingDuels,
    maxPointsAvailable,
  }: {
    clan: string;
    points: number;
    matchCount: number;
    average: string;
    missingDuels: number;
    maxPointsAvailable: number;
  }) {
    this.clan = clan;
    this.points = points;
    this.matchCount = matchCount;
    this.average = average;
    this.missingDuels = missingDuels;
    this.maxPointsAvailable = maxPointsAvailable;
  }
}