
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { auth } from "@/auth";
// import { Navbar } from "@/components/ui/navbar/Navbar";


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
        <Providers session={session}>
          {/* <Navbar /> */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
