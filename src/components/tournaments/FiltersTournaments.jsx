import React from 'react';

export const FiltersTournaments = ({ setFilterName, setFilterType }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Nombre de torneo"
        className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
        onChange={(e) => setFilterName(e.target.value.toLowerCase())}
      />

      <select
        onChange={(e) => setFilterType(e.target.value)}
        className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
      >
        <option value="">Todos</option>
        <option value="LEAGUE">Liga</option>
        <option value="CUP">Copa</option>
        <option value="FRIENDLY">Amistoso</option>
      </select>
    </div>
  );
};
