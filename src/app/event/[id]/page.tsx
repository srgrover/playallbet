import { EventData } from "@/components";

interface Props {
  params: Promise<{ id: number }>
}

export default async function Event({ params }: Props) {
  const { id } = await params;

  return (
    <EventData eventId={ id } />
  );
}
