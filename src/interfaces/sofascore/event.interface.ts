import { EventState } from "./event-state.interface"
import { Referee } from "./referee.interface"
import { RoundInfo } from "./round-info.interface"
import { Score } from "./score.interface"
import { Season } from "./season.interface"
import { Status } from "./status.interface"
import { Team } from "./team.interface"
import { Time } from "./time.interface"
import { Tournament } from "./tournament.interface"
import { Venue } from "./venue.interface"

export interface Event {
    eventState: EventState
    tournament: Tournament
    season: Season
    roundInfo: RoundInfo
    customId: string
    status: Status
    venue: Venue
    referee: Referee
    homeTeam: Team
    awayTeam: Team
    homeScore: Score
    awayScore: Score
    coverage: number
    time: Time
    hasGlobalHighlights: boolean
    hasXg: boolean
    hasEventPlayerStatistics: boolean
    hasEventPlayerHeatMap: boolean
    detailId: number
    crowdsourcingDataDisplayEnabled: boolean
    id: number
    defaultPeriodCount: number
    defaultPeriodLength: number
    defaultOvertimeLength: number
    slug: string
    startTimestamp: number
    finalResultOnly: boolean
    feedLocked: boolean
    cupMatchesInRound: number
    seasonStatisticsType: string
    showTotoPromo: boolean
    isEditor: boolean
  }