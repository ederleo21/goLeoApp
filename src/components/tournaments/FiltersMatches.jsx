import React from 'react';
import { useLocation } from 'react-router-dom';

export const FiltersMatches = ({ filterState, setFilterState, clubs, setFilterClub, filterClub, isLeague=false, filterNumberRound, setFilterNumberRound }) => {
  const location = useLocation();

  return (
    <div className='flex flex-wrap justify-center items-center gap-4 mt-4 font-[Poppins]'>
      <div>
        <h1 className="font-bold text-xl text-slate-900">Filtros: </h1>
      </div>

      {isLeague && (
        <input 
          placeholder='Número de ronda'
          value={filterNumberRound}
          onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                  setFilterNumberRound(value);
              }
          }}
          className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
          type="number"
          min="0"
        />
      )}

      <select
        value={filterClub}
        className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
        onChange={(e) => setFilterClub(e.target.value)}
      >
        <option value="">Todos los clubs</option>
        {clubs?.map((club) => (
          <option key={club.id} value={club.id}>
              {club.name}
          </option>
        ))}
      </select>

      {location.pathname.includes("tournaments") && 
        <select 
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
        >
          <option value="">Todos</option>
          <option value="WAITING">Pendientes</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="COMPLETED">Completados</option>
        </select>
      }

    </div>
  )
}
