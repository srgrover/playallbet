import { EventState } from "./event-state.interface";
import { Score } from "./score.interface";
import { Status } from "./status.interface";
import { Team } from "./team.interface";
import { Tournament } from "./tournament.interface";

export interface FeaturedEvent {
    eventState: EventState
    tournament: Tournament
    customId: string
    status: Status
    homeTeam: Team
    awayTeam: Team
    homeScore: Score
    awayScore: Score
    id: number
    slug: string
    startTimestamp: number
    finalResultOnly: boolean
  }