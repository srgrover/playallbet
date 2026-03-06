import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://www.sofascore.com/api/v1/odds/1/featured-events-by-popularity/football';

  const headers = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'es-ES,es;q=0.7',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'referer': 'https://www.sofascore.com/es-la/',
    'sec-ch-ua': '"Not:A-Brand";v="99", "Brave";v="145", "Chromium";v="145"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    'x-requested-with': '82765a',
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store', // Disable Next.js caching for fresh data
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `SofaScore API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching from SofaScore:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from SofaScore API' },
      { status: 500 }
    );
  }
}