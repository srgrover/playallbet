import { getBetByMatchIdAndUserId, getUserByEmail } from "@/actions";
import { EventData } from "@/components";
import { auth } from "@/auth";
import { Bet, Choice, Event, Odd } from "@/interfaces";

interface Props {
  params: Promise<{ id: number }>
}

async function getEvent(id: number): Promise<Event | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sofascore/get-event-by-id?id=${id}`, { next: { revalidate: 60 } });
  if (!response.ok) return null;
  const data = await response.json();
  return data.event;
}

async function getOdds(id: number): Promise<Choice[] | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sofascore/get-odds-by-event-id?id=${id}`, { next: { revalidate: 60 } });
  if (!response.ok) return null;
  const data = await response.json() as Odd;
  return data?.featured.default.choices;
}

async function getUserBet(id: number): Promise<Bet | null> {
  const { ok, bet } = await getBetByMatchIdAndUserId(id);
  if (!ok) return null;
  return bet!;
}

async function getUserCoins() {
  const session = await auth();
  if (!session?.user?.email) return 0;
  const user = await getUserByEmail(session.user.email);
  return user.user?.coins ?? 0;
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  const event = await getEvent(id);
  const odds = await getOdds(id);
  const userBet = await getUserBet(id);
  const userCoins = await getUserCoins();

  return (  
    <EventData 
      key={id} 
      initialEvent={event} 
      initialOdds={odds} 
      initialUserBet={userBet} 
      initialUserCoins={userCoins}
    />
  );
}
