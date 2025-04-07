import React from "react";
import torneo from '../../assets/img/g_tournament.jpg'
import { TfiCup } from "react-icons/tfi";

export const TournamentHeader = () => {
  
  return (
    <section className="bg-white font-[Poppins]">
      <div className="grid max-w-screen-md px-4 py-9 mx-auto lg:gap-6 xl:gap-7 lg:py-12 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-3 text-3xl flex items-center gap-2 sm:gap-3 font-bold tracking-tight leading-tight md:text-4xl xl:text-5xl dark:text-black">
            Torneos
            <TfiCup className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-orange-600" />
          </h1>

          <p className="max-w-2xl mb-4 font-medium text-gray-900 md:text-normal lg:text-lg dark:text-gray-800">
            Crea y gestiona torneos, une a tus equipos favoritos e ingresa resultados.
          </p>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={torneo} alt="mockup" className="w-full max-w-sm rounded-md" />
        </div>
      </div>
    </section>
  );
};
