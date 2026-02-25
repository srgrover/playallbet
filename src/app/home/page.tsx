
import { League } from "@/components/ui/league/League";

export default async function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`;

  // const url_sofascore = `https://api.unidadeditorial.es/sports/v1/events/preset/1_99a16e5b?timezoneOffset=1&date=${formattedDate}`;
  const url_sofascore = `https://www.fotmob.com/api/data/matches?date=${formattedDate}&timezone=Europe%2FMadrid&ccode3=ESP`
  const headers = new Headers();
  headers.append('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36');
  headers.append('referer', 'https://www.sofascore.com/es-la/');

  let futbol = []

  const response = await fetch(url_sofascore, {
    method: 'GET',
    headers,
    cache: 'no-store'
  });

  let events: any = {};
  if (response.ok) {
    events = await response.json();
    // futbol = events.data.filter((event: any) => event.sport.id === '01');
    console.info({events})
    // console.info(futbol)
  } else {
    console.error("Failed to fetch from Sofascore API:", response.status, await response.text());
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-5xl font-bold text-center mb-12 text-primary">
        Demuestra cuánto sabes de deporte
      </h1>
      <div className="grid grid-cols-1 gap-8">
        { 
          events.leagues.map((league: any) => (
            <League key={league.id} league={league} />
          ))
        }
      </div>
    </div>
  );
}
