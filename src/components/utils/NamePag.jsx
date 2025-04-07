import React from 'react'

export const NamePag = ({ title, icon }) => {


  return (
<div className="fixed top-[84px] left-4 bg-gray-100 text-gray-800 shadow-lg rounded-md px-4 py-2 z-50 border-l-[12px] border-indigo group transition-transform duration-300 ease-in-out hover:translate-x-2">
  <div className="flex items-center space-x-3">
    {icon && <div>{icon}</div>}
    <h1 className="text-2xl font-bold uppercase font-[Gustep]">
      {title}
    </h1>
  </div>
</div>

  )
}
