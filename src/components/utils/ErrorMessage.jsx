import React from 'react'

export const ErrorMessage = ({ message }) => {


  return (
    <div className='text-center w-96 m-auto p-6 text-red-600 font-bold' >
        <p>{message}</p>
    </div>
  )
}
