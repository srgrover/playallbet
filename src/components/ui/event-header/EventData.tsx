
'use client';

import { getEventDateFormat } from '@/app/utils';
import { Odd, Selection } from '@/interfaces/footmob/odds.interface';
import { getEventOddsById } from '@/lib/data-fetching';
import { useEventStore } from '@/store/event/events-store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaArrowLeft, FaTrophy } from 'react-icons/fa6';

interface Props {
    eventId: number
}

export const EventData = ({ eventId }: Props) => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const event = useEventStore(state => state.getEventById(parseInt(eventId.toString())));
    const eventLeagueFromStore = useEventStore(state => state.getLeagueByMatchId(parseInt(eventId.toString())));
    const [odds, setOdds] = useState<Selection[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [finalized, setFinalized] = useState(false);

    console.log({ event })

    useEffect(() => {
        const fetchOdds = async () => {
            try {
                const res = await getEventOddsById(eventId);
                if (res.ok) {
                    const oddsResp: Odd = await res.json();
                    if (oddsResp?.odds.matchfactMarkets !== undefined) {
                        setFinalized(false);
                        setOdds(oddsResp?.odds.matchfactMarkets[0].selections);
                    } else {
                        setFinalized(true);
                        setOdds(oddsResp?.odds.resolvedOddsMarket.selections);
                    }
                    console.log({ oddsResp })
                } else {
                    console.error("Failed to fetch odds:", res.status, await res.text());
                }
            } catch (error) {
                console.error("Error fetching odds:", error);
            } finally {
                setLoading(false);
            }
        };

        if (eventId && hasMounted) {
            fetchOdds();
        }
    }, [eventId, hasMounted]);

    if (!hasMounted) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }


    if (!event) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-2xl font-bold mb-4">Event not found</h1>
                <Link href="/home" className="text-blue-500 hover:underline">
                    Go back to events
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full min-h-[250px] bg-[#99d15c] p-4 px-8 text-white">
                <div className="grid grid-cols-1">
                    <div className="flex items-center gap-4">
                        <Link href="/home" className="border-2 border-white rounded-full font-raleway-bold py-1 px-4 flex items-center gap-2 hover:bg-white hover:text-[#99d15c] transition-colors">
                            <FaArrowLeft size={14} />
                            <span>Eventos</span>
                        </Link>
                        <div className="flex items-center gap-2 font-raleway-medium text-sm">
                            <span>/</span>
                            <a href="#" className="underline underline-offset-2">Fútbol</a>
                            <span>/</span>
                            <a href="#" className="underline underline-offset-2">{eventLeagueFromStore?.name ?? ''}</a>
                        </div>
                    </div>

                    <div className="my-5 text-center">
                        <div className="flex justify-center items-center gap-4 font-raleway-extrabold text-3xl text-shadow-lg">
                            <span>{event.home.name}</span>
                            <span>{event.home.score ? event.home.score : ''}</span>
                            <Image src={`https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${eventLeagueFromStore?.primaryId}.png`} alt={eventLeagueFromStore?.name ?? 'tournament'} className='rounded-xs' width="50" height="50" loading="lazy" />
                            <span>{event.home.score ? event.away.score : ''}</span>
                            <span>{event.away.name}</span>
                        </div>

                        <div className="flex justify-center items-center gap-3 font-raleway-normal text-sm mt-2">
                            <span className="flex items-center gap-1">
                                <FaCalendarAlt size={14} />
                                {getEventDateFormat(event.time)}

                            </span>
                            <span>-</span>
                            <span className="flex items-center gap-1">
                                <FaTrophy size={14} />
                                {/* League name is not on the match object, so keeping this placeholder */}
                                {eventLeagueFromStore?.name ?? ''}
                            </span>
                            <span>-</span>
                            <span className="flex items-center gap-1">
                                <Image src={`https://images.fotmob.com/image_resources/logo/teamlogo/${eventLeagueFromStore?.ccode.toLowerCase()}.png`} alt={''} className='rounded-xs' width="20" height="20" loading="lazy" />
                                {eventLeagueFromStore?.ccode ?? ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6 shadow-sm bg-white p-4 px-8">
                <div className="grid grid-cols-1 gap-2">
                    {
                        finalized && <span className="font-raleway-medium text-amber-500 text-sm">El partido ha terminado. Revisa el resultado</span>
                    }
                    {
                        (event.status.started && !finalized) && <span className="font-raleway-medium text-amber-500 text-sm">El partido ya ha comenzado. Solo se permiten apuestas antes de que el evento haya empezado.</span>
                    }
                    <span className="font-raleway-medium text-sm text-gray-400">Opcion ganadora</span>
                    <form action="" className="grid grid-cols-3 gap-4">
                        {
                            !loading && odds?.map((selection: any, index: number) => (
                                <div key={index} className={`border border-gray-200 col-span-1 flex justify-between gap-4 shadow-sm rounded text-lg ${finalized && 'bg-gray-200'} `}>
                                    <span className="flex justify-start font-raleway-bold text-gray-500 w-full">
                                        <div className="flex justify-around items-center font-raleway-bold text-gray-500 w-10">
                                            <input disabled={finalized} type="radio" name="odd" id={`odd${selection.name}`} className="h-full w-full" />
                                        </div>
                                        <label htmlFor={`odd${selection.name}`} className={`flex justify-between items-center py-3 px-4 w-full gap-2 ${!finalized ? 'cursor-pointer' : ''}`}>
                                            <span>{selection.name === '1' ? event.home.name : selection.name === 'x' ? 'Empate' : event.away.name}</span>
                                            <span>{selection.oddsDecimal}</span>
                                        </label>
                                    </span>
                                </div>
                            ))
                        }
                        {loading && <div>Loading odds...</div>}
                    </form>
                </div>

                <span className="font-raleway-medium text-sm text-gray-400">Sube de nivel para desbloquear mas opciones</span>
            </div>
        </div>
    );
}
