
'use client';

import { useState } from 'react';
import type { Session } from 'next-auth';
// import { placeBet } from '@/lib/actions';
import { CompetitorImage } from "../competitor-image/CompetitorImage";
import styles from './event-card-alternative.module.css';

interface Props {
    event: any;
    session: Session | null;
}

export const EventCardAlternative = ({ event, session }: Props) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleBet = async (selection: 'home' | 'away' | 'draw') => {
        setLoading(true);
        setMessage('');
        setError('');

        // const result = await placeBet(event.id, selection);

        // if (result.error) {
        //     setError(result.error);
        // } else {
        //     setMessage(result.success || 'Apuesta realizada');
        // }

        setLoading(false);
    };

    const getEventDate = (startDate: string) => {
        const eventDate = new Date(startDate);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const eventTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        if (eventDate.toDateString() === today.toDateString()) {
            return `Hoy a las ${eventTime}`;
        } else if (eventDate.toDateString() === tomorrow.toDateString()) {
            return `Mañana a las ${eventTime}`;
        } else {
            const eventDay = eventDate.toLocaleDateString([], { day: 'numeric', month: 'long' });
            return `El ${eventDay} a las ${eventTime}`;
        }
    };

    const isBettingDisabled = !session || event.sportEvent.status.id !== 0 || loading;

    return (
        <div className={`flex flex-col justify-between bg-white rounded-lg shadow-md ${styles.card}`}>
            <div className="p-5">
                <div className="grid grid-cols-1 justify-between items-center mb-4">
                    <span className="text-xs text-gray-500 font-bold">
                        {event.sportEvent.status.id === 0 ? getEventDate(event.startDate) : <span>Finalizado</span>}
                    </span>
                </div>

                <div className="grid grid-cols-1 justify-start items-center gap-1 mb-4">
                    <span className="flex justify-start text-xs text-blue-400 font-bold items-center gap-2">
                        <span>{event.sport.name}</span>
                        <span className="font-extrabold">·</span>
                        <span>{event.tournament.name}</span>
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CompetitorImage 
                                src={event.sportEvent.competitors.homeTeam.imageUrlSizes.xs ?? event.sportEvent.competitors.homeTeam.imageUrl} 
                                alt={event.sportEvent.competitors.homeTeam.fullName} 
                                className="pixelated" 
                            />
                            <p className="font-raleway-bold text-lg">{event.sportEvent.competitors.homeTeam.fullName}</p>
                        </div>
                        {event.sportEvent.status.id !== 0 && <span className={`text-xl font-bold ${event.score?.homeTeam?.totalScore > event.score?.awayTeam?.totalScore ? 'text-gray-900' : 'text-gray-500'}`}> {event.score?.homeTeam?.totalScore ?? ''} </span>}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CompetitorImage 
                                src={event.sportEvent.competitors.awayTeam.imageUrlSizes.xs ?? event.sportEvent.competitors.awayTeam.imageUrl} 
                                alt={event.sportEvent.competitors.awayTeam.fullName}
                                className="pixelated"
                            />
                            <p className="font-raleway-bold text-lg">{event.sportEvent.competitors.awayTeam.fullName}</p>
                        </div>
                        {event.sportEvent.status.id !== 0 && <span className={`text-xl font-bold ${event.score?.awayTeam?.totalScore > event.score?.homeTeam?.totalScore ? 'text-gray-900' : 'text-gray-500'}`}> {event.score?.awayTeam?.totalScore ?? ''}</span>}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-b-lg">
                {session && event.sportEvent.status.id === 0 && (
                    <div className="flex justify-around items-center">
                        <button onClick={() => handleBet('home')} disabled={isBettingDisabled} className={`${styles.betButton} ${isBettingDisabled ? styles.disabled : ''}`}>Local</button>
                        <button onClick={() => handleBet('draw')} disabled={isBettingDisabled} className={`${styles.betButton} ${isBettingDisabled ? styles.disabled : ''}`}>Empate</button>
                        <button onClick={() => handleBet('away')} disabled={isBettingDisabled} className={`${styles.betButton} ${isBettingDisabled ? styles.disabled : ''}`}>Visitante</button>
                    </div>
                )}
                {!session && event.sportEvent.status.id === 0 && (
                    <p className="text-center text-sm text-gray-500">Inicia sesión para poder apostar</p>
                )}
                {event.sportEvent.status.id !== 0 && (
                    <p className="text-center text-sm font-bold text-gray-600">Este partido ya ha finalizado</p>
                )}
                {loading && <p className="text-center text-sm text-blue-500">Realizando apuesta...</p>}
                {message && <p className="text-center text-sm text-green-500">{message}</p>}
                {error && <p className="text-center text-sm text-red-500">{error}</p>}
            </div>
        </div>
    );
}
