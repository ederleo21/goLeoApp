import React from "react";
import { NavLink } from "react-router-dom";

export const MatchesTournament = ({ tournament }) => {

  if (!tournament || tournament.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No hay partidos disponibles para este torneo.
      </p>
    );
  }

  return (
    <div className="mt-8 font-[Poppins]">
      <h2 className="text-2xl font-bold text-center mb-6">
        Partidos del Torneo
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournament.map((match) => (

          <div
            key={match.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={match.home_team.logo}
                  alt={`${match.home_team.name} logo`}
                  className="w-12 h-12 rounded-full object-contain"
                />
                <span className="font-medium text-gray-700">
                  {match.home_team.name}
                </span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                {match.score_home} - {match.score_away}
              </span>
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">
                  {match.away_team.name}
                </span>
                <img
                  src={match.away_team.logo}
                  alt={`${match.away_team.name} logo`}
                  className="w-12 h-12 rounded-full object-contain"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-semibold">Ronda:</span> {match.round}
              </p>
              <p>
                <span className="font-semibold">Fecha:</span>{" "}
                {match.date}
              </p>
              <p>
                <span className="font-semibold">Estado:</span> {match.state}
              </p>
            </div>
            <div>
              <NavLink to={`/performances/match/${match.id}`}>
                <button className="bg-indigo p-2 rounded-lg text-white font-semibold mt-2">
                  Estadísticas
                </button>
              </NavLink>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};
