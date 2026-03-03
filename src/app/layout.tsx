
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { auth } from "@/auth";
import { Navbar, ProfileMenu } from "@/components";
import Image from "next/image";
import { Toaster } from "@/components"


export const metadata: Metadata = {
  title: "PlayAllbet - Apuestas Deportivas",
  description: "Demuestra cuánto sabes de deporte. Apuesta gratis en tus deportes favoritos, compite y sube de nivel.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="es" className="min-h-full">
      <body className={`bg-slate-100 min-h-full`}>
        <Providers session={ session }>
          <main className="grid grid-cols-10 min-h-full">
            {
              session?.user &&
              <ProfileMenu user={ session.user } />
            }
            <div className={`${ session?.user ? 'col-span-9' : 'col-span-10'}` }>
              <Navbar session={ session } />
              <main>{children}</main>
            </div>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}