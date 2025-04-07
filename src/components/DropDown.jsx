import React from 'react'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BsPersonCheck } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";

export const DropDown = ({onToggleDropdown, user, isDropdownOpen, dropdownRef}) => {


  return (
    <div className="relative"  ref={dropdownRef}>
    <img
        src={user.user.image}
        alt="imageUser"
        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer hover:scale-125"
        onClick={onToggleDropdown}
    />
    {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="px-4 py-3 text-sm dark:text-white bg-indigo text-white">
                <h1 className='flex items-center gap-2 font-semibold text-lg mb-1'><BsPersonCheck className='text-2xl' /> {user.user.username}</h1>
                {user.user.email &&
                    <div className="font-medium truncate">{user.user.email}</div>
                }
             </div>
            <ul>
                {
                user.groups.map((group, index) => (
                    <li key={index}>
                        <h2 className='flex items-center gap-1 font-semibold px-4 py-2 text-gray-800 hover:bg-gray-10'><TiTickOutline className='text-2xl text-indigo-800' />{group}</h2>
                    </li>
                    ))
                }
                <li>
                    <NavLink to={`user`} >
                      <p className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Perfil</p>
                    </NavLink>
                </li>
                <li>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Tema</a>
                </li>
                <li>
                    <NavLink className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white" onClick={() => {toast.error("Sesión cerrada", {duration: 2000})}} to="/logout">Cerrar sesión</NavLink>
                </li>
            </ul>
        </div>
    )}
    </div>      
  )
}
