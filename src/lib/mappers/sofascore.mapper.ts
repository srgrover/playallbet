
import { Event, Team as SofascoreTeam, Tournament as SofascoreTournament } from "@/interfaces/sofascore";
import { Match, Team, Tournament } from "@prisma/client";

export const mapSofascoreToTeam = (sofascoreTeam: SofascoreTeam): Omit<Team, 'countryId' | 'sportId' | 'teamColorsId'> => ({
  id: sofascoreTeam.id,
  name: sofascoreTeam.name,
  nameCode: sofascoreTeam.nameCode,
  national: sofascoreTeam.national,
  shortName: sofascoreTeam.shortName,
  slug: sofascoreTeam.slug,
  type: sofascoreTeam.type
});

export const mapSofascoreToTournament = (sofascoreTournament: SofascoreTournament): Tournament => ({
  id: sofascoreTournament.id,
  name: sofascoreTournament.name,
  isNational: sofascoreTournament.category.country?.name === 'International',
});

export const mapSofascoreToMatch = (event: Event): Omit<Match, 'homeTeamId' | 'awayTeamId' | 'tournamentId'> & { homeTeamId: number, awayTeamId: number, tournamentId: number } => ({
  id: event.id,
  abbName: `${event.homeTeam.nameCode} vs ${event.awayTeam.nameCode}`,
  fullName: `${event.homeTeam.name} vs ${event.awayTeam.name}`,
  country: event.tournament.category.country?.name || null,
  countryName: event.tournament.category.name,
  imageUrl: `https://api.sofascore.com/api/v1/event/${event.id}/image`,
  homeTeamId: event.homeTeam.id,
  awayTeamId: event.awayTeam.id,
  tournamentId: event.tournament.id
});

