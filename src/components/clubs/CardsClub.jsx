import React, { act, useContext, useState } from 'react'
import { CardClub } from './CardClub'
import { UserContext } from '../../context/userContext'
import { NavLink } from 'react-router-dom'
import { Loading } from '../utils/Loading'
import { FiltersClubs } from './FiltersClubs'

export const CardsClub = ({ clubs }) => {

  const { user, loading } = useContext(UserContext)
  const [searchTermName, setSearchTermName] = useState("")
  const [searchTermUbication, setSearchTermUbication] = useState("")
  const [activeFilter, setActiveFilter] = useState("")

  if (loading){
    return(
        <Loading/>
    )
  }

  const filteredClubs = clubs.filter((club) => {
    const matchesSearchName = searchTermName
      ? club.name.toLowerCase().includes(searchTermName.toLowerCase())
      : true;
  
    const matchesSearchUbication = searchTermUbication
      ? club.location.toLowerCase().includes(searchTermUbication.toLowerCase())
      : true;
  
    const matchesActiveFilter = activeFilter
      ? activeFilter === "active"
        ? club.active
        : !club.active
      : true;
  
    return matchesSearchName && matchesSearchUbication && matchesActiveFilter;
  });

  return (
<div className="container mx-auto p-4 xl:px-20 flex flex-col items-center">
  <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-4">
    {/* Botón para añadir club */}
    {user.permissions.add_club && (
      <NavLink to="create">
        <button className="px-5 py-3 bg-indigo hover:bg-indigo text-white font-semibold rounded-lg transition-colors font-[Poppins] shadow-md">
          Añadir club
        </button>
      </NavLink>
    )}
      
      {/* Filtros de clubes */}
      <FiltersClubs 
        searchTermName={searchTermName} 
        setSearchTermName={setSearchTermName}
        searchTermUbication={searchTermUbication}
        setSearchTermUbication={setSearchTermUbication}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        />
  </div>

  {/* Contenedor de los clubes */}
  {filteredClubs.length > 0 ? (
  <div className="w-full max-w-full max-h-[500px] overflow-y-auto border border-gray-200 rounded-xl shadow-lg p-4 bg-white">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
    {filteredClubs.map((club) => (
      <CardClub key={club.id} club={club} />
    ))}
    </div>
  </div>   
  ) : (
    <p className="text-red-600 text-lg font-semibold mt-4 ">No se encontraron clubes.</p>
  )}
</div>
  )
}










