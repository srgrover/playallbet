import { FeaturedEvent } from "@/interfaces";
import Image from "next/image";
import { getEventTimestampFormat } from "@/app/utils";
import { Clock } from "lucide-react";
import Link from "next/link";

interface Props {
    title: string;
    cols?: number;
    limit?: number;
    titleIcon?: React.ReactNode;
    events: FeaturedEvent[]
}

export function EventsWidgetSC({ title, cols = 2, limit = 10, titleIcon, events }: Props) {
    const eventsFilter = events.filter(f => f.startTimestamp > new Date().getTime() / 1000)
    const eventsLimit = eventsFilter.slice(0, limit)

    return (
        <div className="flex flex-col gap-3 bg-white rounded-sm p-5">
            <span className="flex items-center gap-2 font-raleway-semibold text-sm text-slate-500">
                { titleIcon }
                { title }
            </span>
            <div className={`grid grid-cols-${cols} gap-3`}>
                {
                    eventsLimit.map(event => {
                        return (
                            <Link href={`/eventsc/${event.id}`} key={event.id} className="flex justify-start items-center rounded-sm gap-3">
                                <div className='rounded-full p-2 overflow-hidden h-11 w-11 bg-slate-300 flex justify-center items-center'>
                                    <Image src={`https://img.sofascore.com/api/v1/unique-tournament/${event.tournament.uniqueTournament.id}/image`} alt={event.tournament.uniqueTournament.name ?? 'tournament'} width="50" height="50" loading="lazy" />
                                </div>
                                <div className="grid grid-cols-1">
                                    <span className="text-lg flex items-center gap-1 font-raleway-semibold text-[#1799db]">
                                        <span>
                                            {event.homeTeam.name}
                                        </span>
                                        <span>
                                            -
                                        </span>
                                        <span>
                                            {event.awayTeam.name}
                                        </span>
                                    </span>
                                    <span className="text-xs flex items-center gap-1 font-raleway-medium text-gray-400">
                                        <Clock size={14} />
                                        {getEventTimestampFormat(event.startTimestamp)}
                                    </span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}
