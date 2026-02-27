'use client'

import { useEffect } from 'react';
import { League as LeagueType } from "@/interfaces";
import { useEventStore } from "@/store/event/events-store";
import { League } from "../league/League";

interface Props {
  initialLeagues: LeagueType[];
}

export const LeagueList = ({ initialLeagues }: Props) => {
  const addEventsToStore = useEventStore(state => state.addEventsToStore);
  const eventsStored = useEventStore(state => state.events);

  useEffect(() => {
    // Load initial server-fetched data into the store
    if (initialLeagues.length > 0) {
      addEventsToStore(initialLeagues);
    }
  }, [initialLeagues, addEventsToStore]);

  return (
    <>
      {
        eventsStored.map((league: any) => (
          <League key={league.id} league={ league } />
        ))
      }
    </>
  );
};
