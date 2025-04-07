import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

export const SectionsMenu = ({ setOpenTableModal, tournament }) => {
    const location = useLocation();
    let is_performances = false
    if (location.pathname.includes("performances")) is_performances = true
    

  return (
<div className="mt-4 font-[Poppins] flex justify-center">
  <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-md flex flex-wrap gap-4 justify-center items-center">
   
    <NavLink 
      to={is_performances 
        ? tournament.type === "LEAGUE" 
          ? `/tournaments/league/${tournament.id}`
          : tournament.type === "FRIENDLY" && `/tournaments/friendly/${tournament.id}`
        : `/performances/tournament/${tournament.id}`
      }
    >
      <button 
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <span>{is_performances ? "Ir a torneo 🏆" : "Ir a estadísticas 📊"}</span>
      </button>
    </NavLink>    

    <button 
      className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow flex items-center gap-2 hover:bg-blue-700 transition"
      onClick={() => setOpenTableModal(true)}
    >
      <span>Tabla de Posiciones</span> 📈
    </button>
    
  </div>
</div>
  )
}
