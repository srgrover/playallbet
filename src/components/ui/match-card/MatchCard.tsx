import { BrandButton } from "../brand-button/BrandButton";
import { MatchImage } from "../match-image/MatchImage";
import styles from './match-card.module.css';

interface Props {
    event: any;
}

export const MatchCard = ({ event }: Props) => {
    const cardColors = ['bg-card-blue', 'bg-card-purple', 'bg-card-yellow'];
    const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];

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

    return (
        <div className={`flex flex-col justify-between ${styles[`bg--${event.sport.id}`]} ${styles['border--football']} rounded-t-[12px] rounded-b-[14px]`}>
            <div key={event.id} className={`p-5`}>
                <div className="grid grid-cols-1 justify-between items-center">
                    <span className="text-xs text-white font-bold">
                        {
                            event.sportEvent.status.id === 0
                                ? <p>{getEventDate(event.startDate)}</p>
                                : <span>Finalizado</span>
                        }
                    </span>
                </div>
                <div className="grid grid-cols-1 justify-start items-center gap-3">
                    <span className="flex justify-start text-xs text-blue-400 font-bold items-center gap-2">
                        <span>
                            {event.sport.name} {event.sport.id}
                        </span>
                        <span className="font-extrabold">·</span>

                        <span>{event.tournament.name}</span>
                    </span>
                </div>

                <div className="grid grid-cols-1 justify-between items-center">
                    <div className="grid grid-cols-[1fr_auto] justify-between items-center gap-3">
                        <div className="flex justify-start items-center gap-3">
                            <MatchImage 
                                src={event.sportEvent.competitors.homeTeam.imageUrlSizes.xs ?? event.sportEvent.competitors.homeTeam.imageUrl} 
                                alt={event.sportEvent.competitors.homeTeam.fullName} 
                                className="pixelated"
                            />
                            <p className="font-extrabold text-2xl">{event.sportEvent.competitors.homeTeam.fullName}</p>
                        </div>

                        <div className="flex justify-end items-center gap-3">
                            {
                                event.sportEvent.status.id !== 0 
                                ? <span className={`text-xl text-gray-500 text-center font-extrabold ${event.score?.homeTeam?.totalScore > event.score?.awayTeam?.totalScore ? 'text-gray-900' : ''}`}> {event.score?.homeTeam?.totalScore ?? ''} </span>
                                : ''
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-[1fr_auto] justify-between items-center gap-3">
                        <div className="flex justify-start items-center gap-3">
                            <MatchImage 
                                src={event.sportEvent.competitors.awayTeam.imageUrlSizes.xs ?? event.sportEvent.competitors.awayTeam.imageUrl} 
                                alt={event.sportEvent.competitors.awayTeam.fullName}
                                className="pixelated"
                            />
                            <p className="font-extrabold text-2xl">{event.sportEvent.competitors.awayTeam.fullName}</p>
                        </div>

                        <div className="flex justify-end items-center gap-3">
                        {
                                event.sportEvent.status.id !== 0 
                                ? <span className={`text-xl text-gray-500 text-center font-extrabold ${event.score?.homeTeam?.totalScore < event.score?.awayTeam?.totalScore ? 'text-gray-900' : ''}`}> {event.score?.awayTeam?.totalScore ?? ''}</span>
                                : ''
                            }

                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-center items-center flex-wrap">
                {
                    <BrandButton text={event.sportEvent.status.id !== 0 ? "TERMINADO" : 'JUGAR'} color="orange" customClass={`w-full rounded-t-[0px]! ${styles['border--t--football']}`} disabled={event.sportEvent.status.id !== 0} />
                }
            </div>
        </div>
    )
}
