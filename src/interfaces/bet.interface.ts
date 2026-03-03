
export interface Bet {
  matchId: number;
  prediction: string;
  localTeamId: number | null;
  awayTeamId: number | null;
  winner?: number | null;
  betCoins: number;
  betProfits: number;
  createdAt?: Date;
  updatedAt?: Date;
  tournamentId: number | null;
  userId?: string | null;
}
