import { EventsWidget } from "@/components";
import { auth } from "@/auth";
import { getUserByEmail } from "@/actions";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { IoFlagSharp } from "react-icons/io5";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) redirect('/auth/login');
  const { user, ok, message } = await getUserByEmail(session?.user?.email || '')

  if (!ok) {
    console.error(message);
    toast.error("Error trying get user", {
        description: message,
        position: "bottom-right"
    })
    redirect('/auth/login');
}

  return (
    <div className="min-h-screen p-8 flex flex-col gap-5">
      <h1 className="text-3xl font-raleway-medium text-[#1799db]">
        Hola, { user?.email }
      </h1>
      <div className="grid grid-cols-1 gap-8 rounded-sm shadow-sm border border-slate-200">
        <EventsWidget title={'Próximos eventos'} limit={10} titleIcon={<IoFlagSharp size={17} className="text-[#1799db]" />} />
      </div>
    </div>
  );
}