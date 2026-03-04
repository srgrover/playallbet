
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  coins: number;
  pendingCoins: number;
  experience: number;
  level: number;
}
