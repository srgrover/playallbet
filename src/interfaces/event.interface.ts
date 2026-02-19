export interface AlternateNames {
    esES: string;
    enEN: string;
    itIT?: string;
    ptBR?: string;
  }
  
  export interface Score {
    totalScore: string;
    subScore: string;
  }
  
  export interface Winner {
    id: string;
    name: string;
  }
  
  export interface Period {
    id: number;
    name: string;
    alternateNames: AlternateNames;
  }
  
  export interface MatchScore {
    homeTeam: Score;
    awayTeam: Score;
    winner: Winner;
    period: Period;
  }
  
  export interface Sport {
    id: string;
    name: string;
    alternateNames: AlternateNames;
    type: string;
  }
  
  export interface Location {
    name: string;
    id: string;
  }
  
  export interface ImageUrlSizes {
    XS: string;
    S: string;
    M: string;
    L: string;
  }
  
  export interface TeamImages {
    urlLogo: string[];
    urlFlag: string[];
  }
  
  export interface Team {
    id: string;
    abbName: string;
    fullName: string;
    commonName: string;
    country: string;
    countryName: string;
    alternateCountryNames: AlternateNames;
    imageUrlSizes: ImageUrlSizes;
    imageUrl: string;
    images: TeamImages;
  }
  
  export interface Competitors {
    homeTeam: Team;
    awayTeam: Team;
  }
  
  export interface Season {
    id: string;
    name: string;
  }
  
  export interface Phase {
    id: number;
    name: string;
    alternateNames: AlternateNames;
  }
  
  export interface Subphase {
    id: number;
    name: string;
    alternateNames: AlternateNames;
  }
  
  export interface Group {
    id: string;
    name: string;
    alternateNames: AlternateNames;
  }
  
  export interface Status {
    id: number;
    name: string;
    alternateNames: AlternateNames;
  }
  
  export interface SportEvent {
    name: string;
    alternateNames: AlternateNames;
    location: Location;
    competitors: Competitors;
    matchDay: string;
    season: Season;
    phase: Phase;
    subphase: Subphase;
    group: Group;
    status: Status;
    referees: string[];
  }
  
  export interface Tournament {
    id: string;
    name: string;
    alternateNames: AlternateNames;
    isNational: boolean;
  }
  
  export interface Match {
    id: string;
    lastUpdate: string;
    startDate: string;
    score: MatchScore;
    sport: Sport;
    sportEvent: SportEvent;
    tournament: Tournament;
  }