import { NextResponse } from 'next/server';

export async function GET() {
  const url_sofascore = 'https://www.sofascore.com/api/v1/sport/football/scheduled-events/2026-02-18';
  const headers = new Headers();
  headers.append('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36');
  headers.append('referer', 'https://www.sofascore.com/es-la/');
  headers.append('accept', '*/*');
  headers.append('accept-language', 'es-ES,es;q=0.7');
  headers.append('sec-fetch-site', 'same-origin');

  const response = await fetch(url_sofascore, {
    method: 'GET',
    headers,
  });

  console.info(response)
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
  }

  const data = await response.json();

  return NextResponse.json(data);
}
