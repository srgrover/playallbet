
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  coins: number;
  experience: number;
  level: number;
}
