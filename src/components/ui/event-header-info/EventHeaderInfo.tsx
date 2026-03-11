
'use client';

import { getEventTimestampFormat } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaArrowLeft, FaTrophy } from 'react-icons/fa6';
import { IoWarningOutline } from 'react-icons/io5';
import { PlaceBetButton } from '../place-bet-button/PlaceBetButton';
import { useSession } from 'next-auth/react';
import { getBetByMatchIdAndUserId, getUserByEmail } from '@/actions';
import { Bet, Choice, Event, Odd } from '@/interfaces';

interface Props {
    eventId: number
}

export const EventHeaderInfo = ({ eventId }: Props) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [odds, setOdds] = useState<Choice[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [finalized, setFinalized] = useState(false);
    const [userCoins, setUserCoins] = useState(0);
    const [eventBet, setEventBet] = useState<Bet | null>(null);
    const [event, setEvent] = useState<Event | null>(null);


    const { data: session } = useSession();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const fetchEventData = async () => {
            if (eventId) {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/sofascore/get-event-by-id?id=${eventId}`);
                    if (response.ok) {
                        const data = await response.json();
                        await setEvent(data.event);
                        setFinalized(event?.status.code === 100);
                        // Aquí puedes procesar los datos recibidos
                        console.log('desde event', event?.status.code)
                        console.log('desde finalized', finalized)

                        console.log('SOFASCORE EVENT DATA BY ID', { data });
                    } else {
                        console.error('Error fetching event data');
                    }
                } catch (error) {
                    console.error('Error fetching event data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        const fetchOddsEventData = async () => {
            if (eventId) {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/sofascore/get-odds-by-event-id?id=${eventId}`);
                    if (response.ok) {
                        const data = await response.json() as Odd;
                        setOdds(data?.featured.default.choices)                        // Aquí puedes procesar los datos recibidos
                        console.log('SOFASCORE ODDS DATA BY ID', { data });
                    } else {
                        console.error('Error fetching event data');
                    }
                } catch (error) {
                    console.error('Error fetching event data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        const getUserBets = async () => {
            console.log('Event ID', eventId);
            const { ok, message, bet } = await getBetByMatchIdAndUserId(eventId);
            if (ok && bet) setEventBet(bet);
        }

        if (eventId && hasMounted) {
            fetchEventData();
            fetchOddsEventData();
            getUserBets();
        }
    }, [eventId, hasMounted]);

    useEffect(() => {
        const fetchUserCoins = async () => {
            if (session?.user?.email) {
                const user = await getUserByEmail(session.user.email);
                setUserCoins(user.user?.coins ?? 0);
            }
        };

        fetchUserCoins();
    }, [session]);

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
                        <Link href="/featured-events" className="border-2 border-white rounded-full font-raleway-bold py-1 px-4 flex items-center gap-2 hover:bg-white hover:text-[#99d15c] transition-colors">
                            <FaArrowLeft size={14} />
                            <span>Eventos</span>
                        </Link>
                        <div className="flex items-center gap-2 font-raleway-medium text-sm">
                            <span>/</span>
                            <a href="#" className="underline underline-offset-2">{event.tournament.category.sport.name ?? ''}</a>
                            <span>/</span>
                            <a href="#" className="underline underline-offset-2">{event.tournament.uniqueTournament?.name ?? ''}</a>
                        </div>
                    </div>

                    <div className="my-5 text-center">
                        <div className="flex justify-center items-center gap-4 font-raleway-extrabold text-3xl text-shadow-lg">
                            <span>{event.homeTeam.name}</span>
                            <span>{event.homeScore.display ? event.homeScore.display : (event.homeScore.normaltime ?? '')}</span>
                            <Image src={`https://img.sofascore.com/api/v1/unique-tournament/${event.tournament.uniqueTournament.id}/image`} alt={event.tournament.uniqueTournament.name ?? 'tournament'} className='rounded-xs' width="50" height="50" loading="lazy" />
                            <span>{event.awayScore.display ? event.awayScore.display : (event.awayScore.normaltime ?? '')}</span>
                            <span>{event.awayTeam.name}</span>
                        </div>

                        <div className="flex justify-center items-center gap-3 font-raleway-normal text-sm mt-2">
                            <span className="flex items-center gap-1">
                                <FaCalendarAlt size={14} />
                                {
                                    (event.status.code !== 100 && !finalized)
                                        ? getEventTimestampFormat(event.startTimestamp)
                                        : 'Finalizado'
                                }
                            </span>

                            <span>-</span>
                            <span className="flex items-center gap-1">
                                <FaTrophy size={14} />
                                {event.tournament.uniqueTournament?.name ?? ''}
                            </span>
                            <span>-</span>
                            <span className="flex items-center gap-1">
                                <Image src={`https://img.sofascore.com/api/v1/category/${event.tournament.category.id}/image`} alt={''} className='rounded-xs' width="20" height="20" loading="lazy" />
                                {event.tournament.category.name ?? ''}
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
                        (event.status.code === 200 && !finalized) && <span className="font-raleway-medium text-amber-500 text-sm">El partido ya ha comenzado. Solo se permiten apuestas antes de que el evento haya empezado.</span>
                    }
                    <span className="font-raleway-medium text-sm text-gray-400">Opcion ganadora</span>
                    <form action="" className={`grid grid-cols-${odds?.length} gap-4`}>
                        {
                            !loading && odds?.map((selection: any, index: number) => (
                                <span key={index}>
                                    <PlaceBetButton event={event} selection={selection} finalized={event.status.code === 100} index={index} userCoins={userCoins} userBet={eventBet} />
                                </span>
                            ))
                        }
                        {loading && <div>Loading odds...</div>}
                    </form>
                    {
                        (!loading && odds?.length === 0) &&
                        <span className="font-raleway-medium text-sm text-amber-400 w-full rounded border border-gray-200 py-3 px-5 flex gap-2 items-center">
                            <IoWarningOutline size={14} />
                            Hubo un problema al cargar las cuotas. Inténtelo de nuevo mas tarde.
                        </span>
                    }
                </div>

                <span className="font-raleway-medium text-sm text-gray-400">Sube de nivel para desbloquear mas opciones</span>
            </div>
        </div>
    );
}
