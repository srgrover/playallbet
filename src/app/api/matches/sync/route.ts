
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { mapSofascoreToTeam, mapSofascoreToTournament, mapSofascoreToMatch } from '@/lib/mappers/sofascore.mapper';
import { getApiUrl } from '@/app/utils';

export async function GET() {
  try {
    const response = await fetch(getApiUrl('/api/sofascore/trending'));
    
    const trendingEvents = await response.json();
    if (!trendingEvents) {
      return NextResponse.json({ error: 'Could not fetch trending events' }, { status: 500 });
    }

    for (const event of trendingEvents.events) {
      const tournamentData = mapSofascoreToTournament(event.tournament);
      console.log('Tournament sync', tournamentData)
      await prisma.tournament.upsert({
        where: { id: tournamentData.id },
        update: tournamentData,
        create: tournamentData,
      });

      const homeTeamData = mapSofascoreToTeam(event.homeTeam);
      await prisma.team.upsert({
        where: { id: homeTeamData.id },
        update: homeTeamData,
        create: homeTeamData,
      });

      const awayTeamData = mapSofascoreToTeam(event.awayTeam);
      await prisma.team.upsert({
        where: { id: awayTeamData.id },
        update: awayTeamData,
        create: awayTeamData,
      });

      const matchData = mapSofascoreToMatch(event);
      await prisma.match.upsert({
        where: { id: matchData.id },
        update: matchData,
        create: matchData,
      });
    }

    return NextResponse.json({ message: 'Matches synced successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to sync matches' }, { status: 500 });
  }
}