
import { EventCard } from "@/components";

export const League = ({ league }: { league: any }) => {
  return (
    <div key={league.primaryId}>
      <div className="flex justify-start items-center gap-2">
        <img src={`https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${league.primaryId}.png`} alt="" width="26" height="26" loading="lazy" />
        <h2 className="text-2xl font-raleway-bold">
        {league.name} - {league.primaryId}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {league.matches.map((match: any) => (
          <EventCard key={match.primaryId} event={match} tournament={league.name} />
        ))}
      </div>
    </div>
  );
};
