import React from 'react'

export const ModalUpdatePLayer = ({ isOpen, onClose, title, children }) => {

    if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 relative overflow-auto max-h-[90vh]">
    <div className="flex justify-between items-center border-b pb-3 bg-yellow-200 px-5 pt-3 rounded-xl">
      <h2 className="text-xl font-semibold">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-500 text-3xl hover:text-gray-700 transition duration-300"
      >
        &times;
      </button>
    </div>
    
    <div className='my-5'>
      {children}
    </div>
    
    {/* Fixed footer with close button */}
    <div className="flex justify-end mt-6">
      <button
        onClick={onClose}
        className="bg-red-600 font-semibold text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Cerrar
      </button>
    </div>
  </div>
</div>

  )
}





