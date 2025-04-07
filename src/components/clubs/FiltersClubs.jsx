import React from 'react'

export const FiltersClubs = ({searchTermName, setSearchTermName, searchTermUbication, setSearchTermUbication, activeFilter, setActiveFilter}) => {


    
  return (
    <>
    {/* Campo de búsqueda */}
    <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTermName}
          onChange={(e) => setSearchTermName(e.target.value)}
          className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.05 3.05a7.5 7.5 0 1013.6 13.6z"
          />
        </svg>
    </div>

    <div className="relative">
        <input
          type="text"
          placeholder="Buscar por ubicación..."
          value={searchTermUbication}
          onChange={(e) => setSearchTermUbication(e.target.value)}
          className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.05 3.05a7.5 7.5 0 1013.6 13.6z"
          />
        </svg>
    </div>
  
      {/* Filtros */}
      <select className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all"
        value={activeFilter}
        onChange={(e) => setActiveFilter(e.target.value)}
      >
        <option value="">Filtrar por estado</option>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
    </>
  )
}
