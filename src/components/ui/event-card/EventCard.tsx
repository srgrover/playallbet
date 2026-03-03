import Link from "next/link";
import { CompetitorImage } from "../competitor-image/CompetitorImage";
import styles from './event-card.module.css';
import { FaArrowRight } from "react-icons/fa6";
import { getEventDateFormat } from "@/app/utils";

interface Props {
    event: any;
    tournament: string;
}

export const EventCard = ({ event, tournament }: Props) => {
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
                                <p className="font-raleway-bold text-2xl text-gray-700">{event.home.name}</p>
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
                                <p className="font-raleway-bold text-2xl text-gray-700">{event.away.name}</p>
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
                                                : <p>{getEventDateFormat(event.time)}</p>
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
                    {
                        event.status.finished || event.status.started
                        ?<button className={`flex justify-start gap-2 items-center border py-1 px-3 rounded-full font-raleway-bold ${styles['button--primary--alternative']}`} disabled>
                            Juega
                            <FaArrowRight size={14} />
                        </button>

                        : <Link href={`/event/${event.id}`} className={`flex justify-start gap-2 items-center border py-1 px-3 rounded-full font-raleway-bold ${styles['button--primary--alternative']}`}>
                            Juega
                        <FaArrowRight size={14} />
                    </Link>
                    }
                    
                </div>
            </div>
        </div>
    )
}
