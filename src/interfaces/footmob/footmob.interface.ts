// interface Team {
//     name: string;
//     id: number;
//     score?: number;
//     imageUrl?: string;
//     pageUrl?: string;
// }

// interface MatchStatus {
//     utcTime: string;
//     started: boolean;
//     cancelled: boolean;
//     finished: boolean;
//     aggregatedStr?: string;
//     numberOfHomeRedCards?: number;
//     numberOfAwayRedCards?: number;
// }

// interface MatchGeneral {
//     matchId: string;
//     matchName: string;
//     matchRound: string;
//     leagueId: number;
//     leagueName: string;
//     homeTeam: Team;
//     awayTeam: Team;
//     matchTimeUTC: string;
//     matchTimeUTCDate: string;
//     started: boolean;
//     finished: boolean;
// }

// interface MatchHeader {
//     teams: Team[];
//     status: MatchStatus;
//     events: unknown[] | null;
// }

// interface MatchContent {
//     matchFacts: {
//         matchId: number;
//         highlights: unknown | null;
//         playerOfTheMatch: Record<string, unknown>;
//         events: {
//             ongoing: boolean;
//             events: unknown[];
//         };
//         infoBox: Record<string, unknown>;
//         teamForm: unknown[][];
//         poll: unknown;
//     };
//     lineup?: unknown;
//     h2h?: unknown;
// }

// // Main response interface
// export interface FotMobMatchDetailsResponse {
//     general: MatchGeneral;
//     header: MatchHeader;
//     nav: string[];
//     ongoing: boolean;
//     hasPendingVAR: boolean;
//     content: MatchContent;
// }

// // Error type for API failures
// export interface FotMobApiError {
//     message: string;
//     status?: number;
//     statusText?: string;
// }


/* ------------------------------------------------------------------------------------------- */

export interface RootLeaguesResponse {
    leagues: League[];
    date: string;
  }
  
  export interface League {
    ccode: string;
    id: number;
    primaryId: number;
    name: string;
    matches: Match[];
    parentLeagueId?: number;
    parentLeagueName?: string;
    internalRank: number;
    liveRank: number;
    simpleLeague: boolean;
    localRank?: number;
    isGroup?: boolean;
    groupName?: string;
  }
  
  export interface Match {
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