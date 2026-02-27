
export interface Bet {
  id?: string;
  userId: string;
  eventId: number;
  selection: 'home' | 'away' | 'draw';
  status: 'pending' | 'won' | 'lost';
  createdAt: Date;
}
