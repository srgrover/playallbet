
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { auth } from "@/auth";
import { Navbar } from "@/components";

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
    <html lang="es">
      <body className={`bg-gray-100`}>
        <Providers session={ session }>
          <main className="grid grid-cols-10">
            <div className="min-h-full w-full bg-[#093b54]">
              
            </div>
            <div className="col-span-9">
              <Navbar />
              <main>{children}</main>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}