import React from 'react'
import { RiInformation2Line } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Loading } from '../utils/Loading';

export const CardPlayer = ({ player }) => {

  const { user, loading } = useContext(UserContext)

  if (loading){
    return(
        <Loading/>
    )
  }

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-md  transform transition-transform hover:scale-105">
    <img 
      className="w-full h-72 object-cover rounded-t-lg" 
      src={player.photo} 
      alt={`${player.first_name} ${player.last_name}`} 
    />
      { user.permissions.view_player && 
        <NavLink to={`player/${player.id}`}>
          <button
            className="absolute top-2 right-2 p-1 bg-white hover:bg-slate-300 text-black rounded-full shadow-md focus:outline-none"
            aria-label="More information"
            ><RiInformation2Line className='text-3xl'/>
          </button>
        </NavLink>
      }
    <div className="p-3 text-center">
      <h3 className="text-lg font-semibold text-gray-900">
        {player.first_name} {player.last_name}
      </h3>
      <p className="text-sm font-bold text-gray-600">{player.dorsal}</p>
      <p className="text-sm text-gray-600">{player.position.description}</p>
      <div className="flex justify-center mt-2">
        <img 
          className="w-10 h-6 object-cover rounded-sm shadow-sm" 
          src={player.nationality.flag} 
          alt={`Bandera de ${player.nationality.name}`} 
        />
      </div>
      <p className="mt-2 font-bold text-sm text-gray-500">{player.club.name}</p>
      {player.active ? 
      <p className="mt-2 font-bold text-sm text-green-800">Activo</p>
      : <p className="mt-2 font-bold text-sm text-red-800">Inactivo</p>
      }
    </div>
  </div>
  )
}
