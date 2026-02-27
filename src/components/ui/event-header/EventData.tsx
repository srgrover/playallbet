
'use client';

import { getEventDateFormat } from '@/app/utils';
import { useEventStore } from '@/store/event/events-store';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaArrowLeft, FaTrophy } from 'react-icons/fa6';


interface Props {
    eventId: number
}

export const EventData = ({ eventId }: Props) => {
    const event = useEventStore(state => state.getEventById(parseInt(eventId.toString())));
    const eventLeagueFromStore = useEventStore(state => state.getLeagueByMatchId(parseInt(eventId.toString())));
    console.log({eventLeagueFromStore})

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
                            <Image src={`https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${eventLeagueFromStore?.primaryId}.png`} alt={eventLeagueFromStore?.name ?? 'tournament'} className='rounded-xs' width="50" height="50" loading="lazy" />
                            
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

            <div className="w-full grid grid-cols-1 gap-6 shadow-sm bg-white p-4 px-8 mt-[-40px] rounded-t-3xl">
                <div className="grid grid-cols-1 gap-2">
                    <span className="font-raleway-medium text-sm text-gray-400">Opcion ganadora</span>
                    {/* Odds section can be implemented here */}
                    <div className="text-gray-500">
                        Voting feature coming soon.
                    </div>
                </div>
                <span className="font-raleway-medium text-sm text-gray-400">Sube de nivel para desbloquear mas opciones</span>
            </div>
        </div>
    );
}
