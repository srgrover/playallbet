'use client';

import { getEventTimestampFormat } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaArrowLeft, FaTrophy } from 'react-icons/fa6';
import { IoWarningOutline } from 'react-icons/io5';
import { PlaceBetButton } from '../place-bet-button/PlaceBetButton';
import { Bet, Choice, Event } from '@/interfaces';

interface Props {
    initialEvent: Event | null;
    initialOdds: Choice[] | null;
    initialUserBet: Bet | null;
    initialUserCoins: number;
}

export const EventData = ({ initialEvent, initialOdds, initialUserBet, initialUserCoins }: Props) => {
    const [event, setEvent] = useState(initialEvent);
    const [odds, setOdds] = useState(initialOdds);
    const [userBet, setUserBet] = useState(initialUserBet);
    const [userCoins, setUserCoins] = useState(initialUserCoins);

    const finalized = event?.status.code === 100;

    const handleBetPlaced = (newBet: Bet) => {
        setUserBet(newBet);
    };

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
                            odds?.map((selection: any, index: number) => (
                                <span key={index}>
                                    <PlaceBetButton
                                        event={event}
                                        selection={selection}
                                        finalized={finalized}
                                        index={index}
                                        userCoins={userCoins}
                                        userBet={userBet}
                                        onBetPlaced={handleBetPlaced} // Pass the handler function
                                    />
                                </span>
                            ))
                        }
                        {!odds &&
                        <span className="font-raleway-medium text-sm text-amber-400 w-full rounded border border-gray-200 py-3 px-5 flex gap-2 items-center">
                            <IoWarningOutline size={14} />
                            Hubo un problema al cargar las cuotas. Inténtelo de nuevo mas tarde.
                        </span>
                    }
                    </form>
                </div>

                <span className="font-raleway-medium text-sm text-gray-400">Sube de nivel para desbloquear mas opciones</span>
            </div>
        </div>
    );
}
