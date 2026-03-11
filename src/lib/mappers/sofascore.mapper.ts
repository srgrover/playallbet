
// import { FeaturedEvent, Sofascore } from "@/interfaces";
// import { League, MatchData } from "@/interfaces/footmob/footmob.interface";

// export const mapSofascoreToFootmob = (sofascoreData: FeaturedEvent): League => {
//   const league: League = {
//     id: sofascoreData.tournament.id,
//     name: sofascoreData.tournament.name,
//     ccode: sofascoreData.tournament.category.flag,
//     primaryId: sofascoreData.tournament.uniqueTournament.id,
//     matches: sofascoreData.events.map((event): MatchData => ({
//       id: event.id,
//       leagueId: sofascoreData.tournament.id,
//       time: event.time.time,
//       home: {
//         id: event.homeTeam.id,
//         score: event.homeScore.current,
//         name: event.homeTeam.name,
//       },
//       away: {
//         id: event.awayTeam.id,
//         score: event.awayScore.current,
//         name: event.awayTeam.name,
//       },
//       eliminatedTeamId: null,
//       statusId: event.status.code,
//       tournamentStage: sofascoreData.tournament.name,
//       status: {
//         cancelled: false,
//         finished: event.status.type === 'finished',
//         started: event.status.type === 'inprogress',
//         startDate: new Date(event.startTimestamp * 1000).toISOString(),
//         startTime: new Date(event.startTimestamp * 1000).toTimeString(),
//       },
//       timeTS: event.startTimestamp,
//     })),
//     simpleLeague: true,
//     internalRank: 1,
//     liveRank: 1,
//   };

//   return league;
// };
