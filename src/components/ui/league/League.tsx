
import { EventCard } from "@/components";
import Image from 'next/image';

export const League = ({ league }: { league: any }) => {
  return (
    <div key={league.primaryId}>
      <div className="flex justify-start items-center gap-2">
        <Image src={`https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${league.primaryId}.png`} alt={league.name} width="26" height="26" loading="lazy" />
        <h2 className="text-2xl font-raleway-bold text-gray-700">
        {league.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {league.matches.map((match: any) => (
          <EventCard key={`${match.primaryId}--${match.id}`} event={match} tournament={league.name} />
        ))}
      </div>
    </div>
  );
};
