import React from 'react'
import { NavLink } from 'react-router-dom';

export const NotFound = () => {

  return (
    <div className="flex items-center justify-center min-h-screen font-[Poppins] bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-2xl text-red-600 mb-8 font-bold">Página no encontrada</p>
        <NavLink to="/" className="px-4 py-2 font-semibold bg-indigo text-white rounded hover:bg-blue-700">
          Volver al inicio
        </NavLink>
      </div>
    </div>
  )
}
