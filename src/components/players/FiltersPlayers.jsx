import React from 'react'

export const FiltersPlayers = ({ searchTermFirstName, setSearchTermFirstName, searchTermLastName, setSearchTermLastName, activeFilter, setActiveFilter, positions, positionFilter, setPositionFilter }) => {

  return (
    <>
    <div className="flex flex-wrap gap-4">
      {/* Filtro por nombre */}
      <input
        type="text"
        placeholder="Nombre de jugador"
        value={searchTermFirstName}
        onChange={(e) => {
          setSearchTermFirstName(e.target.value);
        }}
        className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
      />
    </div>
      
    <div className="flex flex-wrap gap-4">
      {/* Filtro por Apellido */}
      <input
        type="text"
        placeholder="Apellido de jugador"
        value={searchTermLastName}
        onChange={(e) => {
          setSearchTermLastName(e.target.value);
        }}
        className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
      />
    </div>

    <select className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all"
    value={activeFilter}
    onChange={(e) => setActiveFilter(e.target.value)}  
    >
        <option value="">Filtrar por estado</option>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
    </select>

    <select className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all"
      value={positionFilter}
      onChange={(e) => setPositionFilter(e.target.value)}
      >
        <option value="">Filtrar una posición</option>
        {positions.map((position) => (
          <option key={position.id} value={position.id}>
            {position.description}
          </option>
        ))}        
    </select>
    </>
  )
}
