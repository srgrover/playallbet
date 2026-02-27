
export async function getEvents(): Promise<Response> {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`;

  const url_sofascore = `https://www.fotmob.com/api/data/matches?date=${formattedDate}&timezone=Europe%2FMadrid&ccode3=ESP`

  const response = await fetch(url_sofascore, {
    method: 'GET',
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });

  return response;
}

export async function getEventById(id: number) {
  const url_sofascore = `https://www.fotmob.com/api/data/match?id=${id}&timezone=Europe%2FMadrid&ccode3=ESP`
  const headers = new Headers();
  headers.append('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36');
  headers.append('referer', 'https://www.sofascore.com/es-la/');

  const response = await fetch(url_sofascore, {
    method: 'GET',
    headers,
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });

  return response;
}
