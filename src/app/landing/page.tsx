
import { EventCardAlternative } from "@/components";
import styles from './page.module.css';
import { BrandButton } from "@/components/ui/brand-button/BrandButton";

export default async function Home() {

  return (
    <div className="min-h-screen grid grid-cols-1 gap-20">
      <div className={`flex flex-col gap-6 justify-center p-8 items-center w-full min-h-[300px] ${styles['header--bg']}`}>
        <div className="font-raleway-bold text-3xl">
          <span>Play</span><span className="text-blue-500 font-raleway-extrabold">Allbet</span>
        </div>
        <h1 className="text-5xl font-raleway-black text-shadow-sm tracking-tighter text-center text-white">
          Demuestra cuánto sabes de deporte
        </h1>
        <div className="text-center text-white text-lg font-raleway-semibold">
          <p>
            ¡Apuesta gratis en sus deportes favoritos.
          </p>
          <p>
            Compite y sube de nivel!
          </p>
        </div>

        <div>
          <BrandButton text="Entra y juega" color="submit" />
        </div>
      </div>

      <div className="grid grid-cols-1 items-center justify-center gap-8">
        <div className="flex justify-center items-center">
          <span className="text-white w-[80px] h-[80px] flex justify-center items-center text-4xl font-raleway-black rounded-full bg--brand--primary">1</span>
        </div>
        <p className="text-center text-slate-700 text-4xl font-raleway-black">Juega en los mejores eventos deportivos</p>
        <div className="flex justify-center items-center text-slate-700 text-sm font-raleway-medium">
          <p className="max-w-3xl text-center">
            Pronostica los resultados deportivos que más te gusten. Desde las mejores ligas de fútbol nacionales e internacionales, baloncesto, tenis, NHL, motoGP, Fórmula 1...
          </p>
        </div>
        <div className="flex justify-center items-center">
          <a href="https://web.archive.org/web/20181115030528mp_/http://playfulbet.com/es/rankings" className="text-sm color--brand--primary font-raleway-semibold text-center">Échale un ojo a nuestros eventos</a>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center justify-center gap-8">
        <div className="flex justify-center items-center">
          <span className="text-white w-[80px] h-[80px] flex justify-center items-center text-4xl font-raleway-black rounded-full bg--brand--primary">2</span>
        </div>
        <p className="text-center text-slate-700 text-4xl font-raleway-black">Pronostica, acierta y gana Coins</p>
        <div className="flex justify-center items-center text-slate-700 text-sm font-raleway-medium">
          <p className="max-w-3xl text-center">
            Es fácil, si aciertas en tus jugadas ganarás Coins extra. Apuesta de manera inteligente, sigue los movimientos y jugadas de tus amigos o de nuestros mejores jugadores.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <a href="https://web.archive.org/web/20181115030528mp_/http://playfulbet.com/es/rankings" className="text-sm color--brand--primary font-raleway-semibold text-center">Sigue a los jugadores más veteranos</a>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center justify-center gap-8">
        <div className="flex justify-center items-center">
          <span className="text-white w-[80px] h-[80px] flex justify-center items-center text-4xl font-raleway-black rounded-full bg--brand--primary">3</span>
        </div>
        <p className="text-center text-slate-700 text-4xl font-raleway-black">Acumula coins y sube de nivel</p>
        <div className="flex justify-center items-center text-slate-700 text-sm font-raleway-medium">
          <p className="max-w-3xl text-center">
            Consigue coins y conviertete en leyenda. Sube de nivel y muestrale al mundo quien eres. Sé la referencia de otros jugadores y llévalos al exito. 
          </p>
        </div>
        <div className="flex justify-center items-center">
          <a href="https://web.archive.org/web/20181115030528mp_/http://playfulbet.com/es/rankings" className="text-sm color--brand--primary font-raleway-semibold text-center">Jugadores mejor valorados</a>
        </div>
      </div>
    </div>
  );
}
