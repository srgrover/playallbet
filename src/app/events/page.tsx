
import { EventCardAlternative } from "@/components";
import { getEvents } from "@/lib/data-fetching";
import { auth } from "@/auth";
import { RootLeaguesResponse, League as LeagueType, Match } from "@/interfaces";

// Helper function to group events by league
const groupEventsByLeague = (leagues: LeagueType[]): { [key: string]: Match[] } => {
  if (!leagues) return {};
  return leagues.reduce((acc, league) => {
    acc[league.name] = league.matches;
    return acc;
  }, {} as { [key: string]: Match[] });
};

export default async function EventsPage() {
  const [response, session] = await Promise.all([
    getEvents(),
    auth(),
  ]);

  let groupedEvents: { [key: string]: Match[] } = {};

  if (response.ok) {
    const data: RootLeaguesResponse = await response.json();
    groupedEvents = groupEventsByLeague(data.leagues);
  } else {
    console.error("Failed to fetch events:", response.status, await response.text());
    // Optionally render an error message to the user
    return (
      <div className="min-h-screen p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Error al cargar los partidos.
        </h1>
        <p>No se pudieron obtener los datos de los partidos en este momento.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-5xl font-bold text-center mb-12 text-primary">
        Partidos de Hoy
      </h1>
      
      {Object.keys(groupedEvents).length > 0 ? (
        Object.entries(groupedEvents).map(([leagueName, events]) => (
          <div key={leagueName} className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{leagueName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(events as any[]).map((event: any) => (
                <EventCardAlternative key={event.id} event={event} session={session} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p className="text-xl">No hay partidos programados para hoy.</p>
        </div>
      )}
    </div>
  );
}
