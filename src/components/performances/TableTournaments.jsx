import React from "react";
import { NavLink } from "react-router-dom";

export const TableTournaments = ({ tournaments }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 font-[Poppins]">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🏆 Torneos Disponibles
      </h1>

      {tournaments.length > 0 ? (
      <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo text-white">
              <th className="px-6 py-4 text-left"></th>
              <th className="px-6 py-4 text-left">Nombre</th>
              <th className="px-6 py-4 text-left">Tipo</th>
              <th className="px-6 py-4 text-left">Inicio</th>
              <th className="px-6 py-4 text-left hidden md:table-cell">Fin</th>
              <th className="px-6 py-4 text-left hidden md:table-cell">Estado</th>
              <th className="px-6 py-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody className="font-semibold">
            {tournaments.map((tournament) => (
              <tr
                key={tournament.id}
                className="hover:bg-gray-100 transition-all duration-300"
              >
                <td className="px-6 py-4">
                  <img
                    src={tournament.photo}
                    alt={tournament.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                </td>
                <td className="px-6 py-4 text-gray-800 font-bold">{tournament.name}</td>
                <td className="px-6 py-4 text-gray-800">{tournament.type}</td>
                <td className="px-6 py-4 text-gray-700">{tournament.start_date}</td>
                <td className="px-6 py-4 text-gray-700 hidden md:table-cell">
                  {tournament.end_date}
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      tournament.active
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {tournament.active ? "Activo" : "Finalizado"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <NavLink to={`/performances/tournament/${tournament.id}`}>
                    <button className="px-4 py-2 bg-indigo text-white rounded-lg hover:bg-indigo transition-all duration-300">
                      Ver torneo
                    </button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
            <p className="font-semibold text-red-600 text-center">No hay torneos disponibles</p>
          <div>
            <NavLink to={`/tournaments/`}>
              <button className="bg-indigo hover:bg-indigo_dark py-3 px-5 font-bold text-white rounded">
                Crear torneo
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
