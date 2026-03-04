import { LeagueList } from "@/components";
import { getEvents } from "@/lib/data-fetching";
import { RootLeaguesResponse, League } from "@/interfaces";

export default async function Home() {
  const response = await getEvents();
  let leagues: League[] = [];

  if (response.ok) {
    const data: RootLeaguesResponse = await response.json();
    leagues = data.leagues;
  } else {
    console.error("Failed to fetch events for Home page:", response.status, await response.text());
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-5xl font-bold text-center mb-12 text-primary">
        Demuestra cuánto sabes de deporte
      </h1>
      <div className="grid grid-cols-1 gap-8">
        <LeagueList initialLeagues={leagues} />
      </div>
    </div>
  );
}