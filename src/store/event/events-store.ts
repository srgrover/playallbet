import { create } from "zustand";
import { League, Match } from "@/interfaces";
import { devtools, persist } from "zustand/middleware";

interface State {
  events: League[];
  matchs: Match[]
  getTotalItems: () => number;
  addEventsToStore: (events: League[]) => void;
  getEventById: (id: number) => Match | null;
  getLeagueByMatchId: (id: number) => League | null;
}

export const useEventStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        events: [],
        matchs: [],

        getTotalItems: () => {
          const { matchs } = get();
          return matchs.length
        },

        addEventsToStore: (events: League[]) => {
          set({ events: [...events] });
          const matches = events.map((league) => league.matches).flat();
          set({ matchs: [...matches] });
        },

        getEventById: (id: number) => {
          const { events } = get();
          const leagueFound = events.find((league) => {
            return league.matches.find((match) => match.id === id)
          });

          if (leagueFound === null || leagueFound === undefined)
            return null

          const matchFound = leagueFound.matches.find((match) => match.id === id);

          if (matchFound === null || matchFound === undefined)
            return null

          return matchFound;
        },

        getLeagueByMatchId: (id: number) => {
          const { events } = get();
          const leagueFound = events.find((league) => {
            return league.matches.find((match) => match.id === id)
          });

          if (leagueFound === null || leagueFound === undefined)
            return null

          return leagueFound;
        },
      }),

      { name: "events-storage" }
    )
  )
);