import Link from "next/link";
import { BrandButton } from "../brand-button/BrandButton";
import { CompetitorImage } from "../competitor-image/CompetitorImage";
import styles from './event-card.module.css';

interface Props {
    event: any;
    tournament: string;
}

export const EventCard = ({ event, tournament }: Props) => {
    const getEventDate = (startDate: string) => {
        const dateDot = startDate.split(' ')[0]
        const dateSplit = dateDot.split('.')
        const day = dateSplit[0]
        const month = dateSplit[1]
        const year = dateSplit[2]

        const hour = startDate.split(' ')[1]
        const eventDate = new Date(`${year}-${month}-${day}T${hour}`);
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
        <div className={`flex flex-col justify-between bg-white shadow-xs`}>
            <div key={event.id} className={`p-5 grid grid-cols-2`}>
                <div className="flex justify-between flex-col items-start gap-2">
                    <div className="flex justify-start items-center gap-2">
                        <div className="grid grid-cols-[1fr_auto] justify-between items-center">
                            <div className="flex justify-start items-center gap-3">
                                <CompetitorImage
                                    src={`https://images.fotmob.com/image_resources/logo/teamlogo/${event.home.id}_xsmall.png`}
                                    alt={event.home.name}
                                />
                                <p className="font-raleway-bold text-2xl">{event.home.name}</p>
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-3">
                            {
                                event.status.finished || event.status.started
                                    ? <span className={`text-xl text-gray-500 text-center font-raleway-extrabold ${event.home?.score > event.away?.score ? 'text-gray-900' : ''}`}> {event.home?.score ?? ''} </span>
                                    : ''
                            }
                        </div>

                        <span className={`text-xl text-gray-500 text-center font-raleway-extrabold`}>-</span>

                        <div className="flex justify-end items-center gap-3">
                            {
                                event.status.finished || event.status.started
                                    ? <span className={`text-xl text-gray-500 text-center font-raleway-extrabold ${event.away?.score > event.home?.score ? 'text-gray-900' : ''}`}> {event.away?.score ?? ''} </span>
                                    : ''
                            }
                        </div>

                        <div className="grid grid-cols-[1fr_auto] justify-between items-center">
                            <div className="flex justify-start items-center gap-3">
                                <p className="font-raleway-bold text-2xl">{event.away.name}</p>
                                <CompetitorImage
                                    src={`https://images.fotmob.com/image_resources/logo/teamlogo/${event.away.id}_xsmall.png`}
                                    alt={event.away.name}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 justify-between items-center">
                        <div className="flex justify-start items-end gap-2">
                            <span className="text-xs text-gray-400 font-bold">
                                {
                                    event.status.finished
                                        ? <span>Finalizado</span>
                                        : !event.status.finished && event.status.started
                                            ? <span>En curso</span>
                                            : event.status.cancelled
                                                ? <span>Cancelado</span>
                                                : <p>{getEventDate(event.time)}</p>
                                }
                            </span>
                            <span className="font-raleway-black text-gray-400">·</span>
                            <span className="flex justify-start text-xs text-blue-400 font-bold items-end gap-2">
                                {/* <span>
                            {event.name}
                        </span> */}
                                {/* <span className="font-extrabold">·</span> */}

                                <span>{tournament}</span>
                            </span>

                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-end">
                    <Link href={`/event/${event.id}`} className={`flex justify-start gap-2 items-center border py-1 px-3 border-[] rounded-full font-raleway-bold ${styles['button--primary--alternative']}`}>
                        Juega
                        <span className="material-symbols-outlined text-sm">
                            arrow_forward
                        </span>
                    </Link>

                </div>
            </div>
            {/* <div className="flex justify-center items-center flex-wrap">
                {
                    <BrandButton text={event.status.finished || event.status.started ? "TERMINADO" : 'JUGAR'} color="primary" customClass={`w-full! rounded-t-[0px]!`} disabled={event.status.finished || event.status.started} />
                }
            </div> */}
        </div>
    )
}
