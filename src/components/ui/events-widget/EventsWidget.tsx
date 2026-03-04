'use client'

import { RootLeaguesResponse } from "@/interfaces";
import { useEffect } from "react";
import { getEvents } from "@/lib/data-fetching";
import { useEventStore } from "@/store/event/events-store";
import Image from "next/image";
import { getEventDateFormat } from "@/app/utils";
import { Clock } from "lucide-react";
import Link from "next/link";

interface Props {
    title: string;
    cols?: number;
    limit?: number;
    titleIcon?: React.ReactNode
}

export function EventsWidget({ title, cols = 2, limit = 10, titleIcon }: Props) {
    const addEventsToStore = useEventStore(state => state.addEventsToStore);
    const getLeagueByMatchId = useEventStore(state => state.getLeagueByMatchId);
    const events = useEventStore(state => state.matchs);
    const eventsFilter = events.slice(0, limit)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();

                if (response.ok) {
                    const data: RootLeaguesResponse = await response.json();
                    if (data.leagues) {
                        addEventsToStore(data.leagues);
                    }
                    console.log({matchs: events})
                } else {
                    console.error("Failed to fetch events for Home page:", response.status, await response.text());
                }
            } catch (error) {
                console.error("An error occurred while fetching events:", error);
            }
        };

        if (events.length === 0) fetchEvents();

    }, [addEventsToStore]);


    return (
        <div className="flex flex-col gap-3 bg-white rounded-sm p-5">
            <span className="flex items-center gap-2 font-raleway-semibold text-sm text-slate-500">
                { titleIcon }
                { title }
            </span>
            <div className={`grid grid-cols-${cols} gap-3`}>
                {
                    eventsFilter.map(match => {
                        const league = getLeagueByMatchId(match.id);

                        return (
                            <Link href={`/event/${match.id}`} key={match.id} className="flex justify-start items-center rounded-sm gap-3">
                                <div className='rounded-full p-2 overflow-hidden h-11 w-11 bg-slate-300 flex justify-center items-center'>
                                    <Image src={`https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${league?.primaryId}.png`} alt={league?.name ?? 'tournament'} width="50" height="50" loading="lazy" />
                                </div>
                                <div className="grid grid-cols-1">
                                    <span className="text-lg flex items-center gap-1 font-raleway-semibold text-[#1799db]">
                                        <span>
                                            {match.home.name}
                                        </span>
                                        <span>
                                            -
                                        </span>
                                        <span>
                                            {match.away.name}
                                        </span>
                                    </span>
                                    <span className="text-xs flex items-center gap-1 font-raleway-medium text-gray-400">
                                        <Clock size={14} />
                                        {getEventDateFormat(match.time)}
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
