import Link from "next/link";

export const revalidate = 60; // 1 minuto


interface Props {
  params: 
    Promise<{ id: number }>
}

export default async function Event({ params }: Props) {
  const { id } = await params;
  console.log({id})

  // const url_sofascore = `https://api.unidadeditorial.es/sports/v1/events/preset/1_99a16e5b?timezoneOffset=1&date=${formattedDate}`;
  const url_sofascore = `https://www.fotmob.com/api/data/match?id=${id}&timezone=Europe%2FMadrid&ccode3=ESP`
  const headers = new Headers();
  headers.append('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36');
  headers.append('referer', 'https://www.sofascore.com/es-la/');

  const response = await fetch(url_sofascore, {
    method: 'GET',
    headers,
    cache: 'no-store'
  });

  let event: any = {};
  if (response.ok) {
    event = await response.json();
    // futbol = events.data.filter((event: any) => event.sport.id === '01');
    console.info({event: event})
    // console.info(futbol)
  } else {
    console.error("Failed to fetch from Sofascore API:", response.status, await response.text());
  }
  // const product = await getProductBySlug(slug);

  // if (!product) notFound();
  return (
    <div className="min-h-screen">
      <div className="w-full min-h-[250px] h-[250px] max-h-[250px] bg-[#99d15c] p-4 px-8">
        <div className="grid grid-cols-1">
          <div className="flex justify-start items-center gap-4">
            <Link href={`/home`} className="border-2 flex justify-between items-center gap-1 cursor-pointer border-white rounded-full font-raleway-bold py-1 px-4 text-white!">
              <span className="material-symbols-outlined text-sm">
                arrow_left_alt
              </span>
              Eventos
            </Link>

            <div className="flex justify-start items-center gap-2 text-white font-raleway-medium text-sm">
              <span>/</span>
              <a className="underline underline-offset-2 decoration-white" href="#">Fútbol</a>
              <span>/</span>
              <a className="underline underline-offset-2 decoration-white" href="#">Champions League</a>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-1 my-5">
            <div className="flex justify-center items-center gap-4 font-raleway-extrabold text-3xl text-shadow-2xs text-white">
              <span>{ event.home.name }</span>
              <span>-</span>
              <span>{ event.away.name }</span>
            </div>

            <div className="flex justify-center items-center gap-3 font-raleway-normal text-sm text-shadow-2xs text-white">
              <span className="flex justify-center items-center gap-1">
                <span className="material-symbols-outlined text-sm!">
                  calendar_clock
                </span>
                getEventDateFormat()
              </span>

              <span>-</span>

              <span className="flex justify-center items-center gap-1">
                <span className="material-symbols-outlined text-sm!">
                  trophy
                </span>
                Champions league</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-6 shadow-sm bg-white p-4 px-8">
        <div className="grid grid-cols-1 gap-2">
          <span className="font-raleway-medium text-sm text-gray-400">Opcion ganadora</span>
          <form action="" className="grid grid-cols-3 gap-4">
            {
              event.odds.odds.matchfactMarkets[0].selections.map((selection: any, index: number) => (
                <div className="border border-gray-200 col-span-1 flex justify-between gap-4 shadow-sm rounded text-lg">
                  <span className="flex justify-start font-raleway-bold text-gray-500 w-full">
                    <div className="flex justify-around items-center font-raleway-bold text-gray-500 w-10">
                      <input type="radio" name="odd" id={`odd${selection.name}`} className="h-full w-full" />
                    </div>
                    <label htmlFor={`odd${selection.name}`}  className="flex cursor-pointer justify-between items-center py-3 px-4 w-full gap-2">
                      <span>{ selection.name === '1' ?  event.home.name : selection.name === 'x' ? 'Empate' : event.away.name}</span>
                      <span>{ selection.oddsDecimal }</span>
                    </label>
                  </span>
                </div>
              ))
            }
          </form>
        </div>

        <span className="font-raleway-medium text-sm text-gray-400">Sube de nivel para desbloquear mas opciones</span>
      </div>
    </div>
  );
}
