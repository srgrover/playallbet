export interface Score {
    normaltime: number
    current: number
    display: number
    period1: number | null
    period2: number | null
    period3: number | null
    period4: number | null
    period1TieBreak?: number | null
    period2TieBreak?: number | null
    period3TieBreak?: number | null
    period4TieBreak?: number | null
  
  }