import React from "react";

export const StatisticCard = ({ player, title, subtitle, score }) => {
  if (!player || (score && player[score] <= 0)) return null;

  const isBestPlayer = title === "Jugador del Partido";

  return (
    <div
      className={`w-64 sm:w-72 font-[Poppins] border-2 rounded-xl shadow-lg overflow-hidden 
      transition-all hover:shadow-2xl ${
        isBestPlayer
          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-500 text-white animate-pulse"
          : "bg-white dark:bg-gray-800 dark:border-gray-700 border-transparent hover:border-blue-500"
      }`}
    >
      {/* Título con fondo estilizado */}
      <div
        className={`text-center py-2 sm:py-3 relative ${
          isBestPlayer ? "bg-yellow-600 text-white" : "bg-indigo text-white"
        }`}
      >
        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider z-10 relative">
          {title}
        </h3>
        {isBestPlayer && (
          <div className="absolute inset-0 bg-yellow-300 opacity-30 blur-md"></div>
        )}
      </div>

      {/* Imagen con borde especial */}
      <div
        className={`relative border-4 overflow-hidden ${
          isBestPlayer ? "border-yellow-400 shadow-yellow-500 shadow-lg" : "border-yellow-500"
        }`}
      >
        <img
          className="w-full h-48 sm:h-56 object-cover"
          src={player?.player_photo}
          alt={player?.player_first_name}
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white py-2 px-4 text-center">
          <h4 className="text-base sm:text-lg font-bold">{player?.player_first_name}</h4>
          <h4 className="text-base sm:text-lg font-bold">{player?.player_last_name}</h4>
        </div>
      </div>

      {/* Contenido con puntuación */}
      <div
        className={`text-center py-3 sm:py-4 ${
          isBestPlayer ? "bg-yellow-500 text-white" : "bg-gray-100 dark:bg-gray-900"
        }`}
      >
        <p className="text-xs sm:text-sm font-medium text-white">{subtitle}</p>
        {score && (
          <p
            className={`text-3xl sm:text-4xl font-extrabold mt-1 transition-transform duration-200 
            hover:scale-110 ${
              isBestPlayer ? "text-white hover:text-yellow-300" : "text-blue-700 dark:text-blue-400 hover:text-blue-500"
            }`}
          >
            {player[score]}
          </p>
        )}
      </div>
    </div>
  );
};
