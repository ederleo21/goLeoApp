import React from "react";
import { NavLink } from "react-router-dom";

export const TournamentCard = ({ tournament }) => {
  
  return (
    <NavLink
      to={
        tournament.type === "LEAGUE"
          ? `/tournaments/league/${tournament.id}/`
          : tournament.type === "CUP"
          ? `/tournaments/cup/${tournament.id}/`
          : tournament.type === "FRIENDLY" && `/tournaments/friendly/${tournament.id}/`
      }
      className="bg-white rounded-xl shadow-xl overflow-hidden group relative transition-all duration-300 hover:scale-105"
    >
      <img
        src={tournament.photo}
        alt={tournament.name}
        className="w-full h-60 object-cover transition-transform duration-300"
      />
      <div className="p-6 py-5 space-y-3">
        <h3 className="text-2xl text-center text-gray-900 font-bold">{tournament.name}</h3>

        {/* Tipo de torneo */}
        <p className="text-sm text-center text-indigo font-bold capitalize">
          {tournament.type}
        </p>

        {/* Fechas */}
        <div className="flex justify-between text-sm text-gray-500">
          <p>
            De:{" "}
            <span className="font-semibold">
              {new Date(tournament.start_date).toLocaleDateString()}
            </span>
          </p>
          <p>
            Hasta:{" "}
            <span className="font-semibold">
              {new Date(tournament.end_date).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* Estado activo */}
        <p className={`text-base font-bold ${tournament.active ? 'text-green-800' : 'text-red-500'}`}>
          {tournament.active ? 'Activo' : 'Inactivo'}
        </p>
      </div>
    </NavLink>
  );
};
