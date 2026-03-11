
// import { League, MatchData } from "@/interfaces/footmob/footmob.interface";
// import { Sofascore, Event, Status, Time, Score, Team, Tournament, Category, UniqueTournament, RoundInfo, Sport } from "@/interfaces";

// export const mapFootmobToSofascore = (footmobLeague: League): Sofascore => {
//   const tournament: Tournament = {
//     id: footmobLeague.id,
//     name: footmobLeague.name,
//     slug: footmobLeague.name.toLowerCase().replace(/\s+/g, '-'),
//     category: {
//       id: 0, // Dato no disponible en Footmob
//       name: '', // Dato no disponible en Footmob
//       slug: '', // Dato no disponible en Footmob
//       sport: {} as Sport, // Dato no disponible en Footmob
//       priority: 0, // Dato no disponible en Footmob
//       flag: footmobLeague.ccode,
//       alpha2: '', // Dato no disponible en Footmob
//     } as Category,
//     uniqueTournament: {
//       id: footmobLeague.primaryId,
//       name: footmobLeague.name,
//       slug: footmobLeague.name.toLowerCase().replace(/\s+/g, '-'),
//       category: {} as Category, // Dato no disponible en Footmob
//       userCount: 0, // Dato no disponible en Footmob
//       idDecoded: '', // Dato no disponible en Footmob
//       hasEventPlayerStatistics: false, // Dato no disponible en Footmob
//       displayInverseHomeAwayTeams: false, // Dato no disponible en Footmob
//       priority: 0, // Dato no disponible en Footmob
//       crowdsourcingEnabled: false, // Dato no disponible en Footmob
//       hasPerformanceGraphFeature: false, // Dato no disponible en Footmob
//     } as UniqueTournament,
//     priority: 0, // Dato no disponible en Footmob
//     competitionType: 0, // Dato no disponible en Footmob
//     crowdsourcingEnabled: false, // Dato no disponible en Footmob
//   };

//   const events: Event[] = footmobLeague.matches.map((match: MatchData): Event => {
//     const status: Status = {
//       code: match.statusId,
//       description: '', // Dato no disponible en Footmob
//       type: match.status.finished ? 'finished' : (match.status.started ? 'inprogress' : 'notstarted'),
//     };

//     const time: Time = {
//       time: match.time,
//       timezone: '', // Dato no disponible en Footmob
//     };

//     const homeScore: Score = { current: match.home.score ?? 0, display: 0, period1: 0, period2: 0, normaltime: 0 };
//     const awayScore: Score = { current: match.away.score ?? 0, display: 0, period1: 0, period2: 0, normaltime: 0 };

//     const homeTeam: Team = {
//       id: match.home.id,
//       name: match.home.name,
//       slug: match.home.name.toLowerCase().replace(/\s+/g, '-'),
//       shortName: match.home.name, // Asumiendo que el nombre corto es igual al nombre
//       gender: '', // Dato no disponible en Footmob
//       sport: {} as Sport, // Dato no disponible en Footmob
//       userCount: 0, // Dato no disponible en Footmob
//       nameCode: '', // Dato no disponible en Footmob
//       disabled: false, // Dato no disponible en Footmob
//       national: false, // Dato no disponible en Footmob
//       type: 0, // Dato no disponible en Footmob
//       subTeams: [], // Dato no disponible en Footmob
//       teamColors: { primary: '', secondary: '', text: '' }, // Dato no disponible en Footmob
//       fieldTranslations: { nameTranslation: {}, shortNameTranslation: {} }, // Dato no disponible en Footmob
//     };

//     const awayTeam: Team = {
//       id: match.away.id,
//       name: match.away.name,
//       slug: match.away.name.toLowerCase().replace(/\s+/g, '-'),
//       shortName: match.away.name, // Asumiendo que el nombre corto es igual al nombre
//       gender: '', // Dato no disponible en Footmob
//       sport: {} as Sport, // Dato no disponible en Footmob
//       userCount: 0, // Dato no disponible en Footmob
//       nameCode: '', // Dato no disponible en Footmob
//       disabled: false, // Dato no disponible en Footmob
//       national: false, // Dato no disponible en Footmob
//       type: 0, // Dato no disponible en Footmob
//       subTeams: [], // Dato no disponible en Footmob
//       teamColors: { primary: '', secondary: '', text: '' }, // Dato no disponible en Footmob
//       fieldTranslations: { nameTranslation: {}, shortNameTranslation: {} }, // Dato no disponible en Footmob
//     };

//     return {
//       id: match.id,
//       tournament: tournament,
//       roundInfo: {} as RoundInfo, // Dato no disponible en Footmob
//       customId: '', // Dato no disponible en Footmob
//       status: status,
//       winnerCode: 0, // Dato no disponible en Footmob
//       homeTeam: homeTeam,
//       awayTeam: awayTeam,
//       homeScore: homeScore,
//       awayScore: awayScore,
//       time: time,
//       changes: { changes: [], changeTimestamp: 0 }, // Dato no disponible en Footmob
//       hasGlobalHighlights: false, // Dato no disponible en Footmob
//       crowdsourcingDataDisplayEnabled: false, // Dato no disponible en Footmob
//       idDecoded: '', // Dato no disponible en Footmob
//       startTimestamp: match.timeTS,
//       slug: '', // Dato no disponible en Footmob
//       finalResultOnly: false, // Dato no disponible en Footmob
//       isFullTime: match.status.finished, // Dato no disponible en Footmob
//     } as Event;
//   });

//   return { tournament, events };
// };
