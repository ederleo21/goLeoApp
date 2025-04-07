import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { Loading } from '../utils/Loading';
import { TbEyeSearch } from "react-icons/tb";

export const CardClub = ({ club }) => {
  const { user, loading } = useContext(UserContext)

  console.log(club.logo)

  if (loading){
    return(
        <Loading/>
    )
  }

  return (
<div className="bg-slate-50 shadow-md rounded-lg p-4 m-4 flex items-center w-full max-w-md relative">
    <img className="w-20 h-20 rounded-full object-cover" src={club.logo} alt={`${club.name} logo`} />
    <div className="ml-4 flex-col mr-16 font-[Poppins]">
        <h2 className="text-2xl mb-1 font-semibold font-[Gupter]">{club.name}</h2>
        <p className="text-gray-600 mb-1 truncate">{club.location}</p>
        <p className="text-gray-600 flex items-center gap-2">
            Estado: {club.active ? <FaCheck className="text-green-700" /> : <IoClose className="text-red-700 font-bold text-2xl" />}
        </p>
    </div>
    {/* Bandera */}
    <div className="absolute bottom-2 right-2">
        <img
            src={club.country.flag}
            alt={`${club.country.name} flag`}
            className="w-10 h-7 rounded shadow-sm"
        />
    </div>
    <div className="absolute top-2 right-2 flex flex-col items-center gap-2">
        {user.permissions.view_club && (
            <NavLink to={`club/${club.id}`}>
                <button className="rounded-full">
                    <TbEyeSearch className="text-4xl hover:scale-125 text-blue-900 mr-1" />
                </button>
            </NavLink>
        )}
    </div>
</div>

  )
}
