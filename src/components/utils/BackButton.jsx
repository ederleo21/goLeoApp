import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoCaretBackOutline } from "react-icons/io5";

export const BackButton = ({ url }) => {

  return (
    <div className="fixed top-20 left-2 z-10 font-[Poppins]">
        <NavLink
        to={url}
        >
            <button 
            className="bg-white px-6 pl-4 text-base md:text-lg py-3 flex items-center gap-1 font-bold text-indigo rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
            >
                <IoCaretBackOutline className='text-xl  md:text-2xl font-bold'/>
                Volver
            </button>
        </NavLink>
    </div>
  )
}
