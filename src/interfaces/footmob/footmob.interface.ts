export interface RootLeaguesResponse {
    leagues: League[];
    date: string;
  }
  
  export interface League {
    ccode: string;
    id: number;
    primaryId: number;
    name: string;
    matches: MatchData[];
    parentLeagueId?: number;
    parentLeagueName?: string;
    internalRank: number;
    liveRank: number;
    simpleLeague: boolean;
    localRank?: number;
    isGroup?: boolean;
    groupName?: string;
  }
  
  export interface MatchData {
    id: number;
    leagueId: number;
    time: string;
    home: Team;
    away: Team;
    eliminatedTeamId: number | null;
    statusId: number;
    tournamentStage: string;
    status: MatchStatus;
    timeTS: number;
  }
  
  export interface Team {
    id: number;
    score: number;
    name: string;
    longName: string;
    redCards?: number;
    penScore?: number;
  }
  
  export interface MatchStatus {
    utcTime: string;
    halfs: MatchHalfs;
    periodLength: number;
    started?: boolean;
    cancelled?: boolean;
    finished?: boolean;
    awarded?: boolean;
    numberOfHomeRedCards?: number;
    numberOfAwayRedCards?: number;
    scoreStr?: string;
    aggregatedStr?: string;
    reason?: MatchReason;
  }
  
  export interface MatchHalfs {
    firstHalfStarted?: string;
    secondHalfStarted?: string;
  }
  
  export interface MatchReason {
    short: string;
    shortKey: string;
    long: string;
    longKey: string;
  }