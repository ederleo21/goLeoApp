import React from "react";
import img from "../../assets/img/g_statistics.png";

export const HeaderPerformances = () => {
  return (
    <header className="bg-white py-10 px-6 rounded-2xl font-[Poppins]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-950">
            Estadísticas de torneos
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Descubre el desempeño de los jugadores, los récords y el impacto de cada partido en tiempo real.
          </p>
        </div>
        
        <div className="w-44 h-44 md:w-96 md:h-64">
          <img src={img} alt="Estadísticas" className="w-full h-full object-contain" />
        </div>
      </div>
    </header>
  );
};
