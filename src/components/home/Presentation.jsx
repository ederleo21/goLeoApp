import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/img/g_football-players.png'

export const Presentation = () => {
    
  return (
  <div className='min-h-screen lg:min-h-[90vh] flex flex-col font-[Poppins] justify-center lg:flex-row items-center md:mx-32 mx-5'>
    
    <div className='flex flex-col mt-10 lg:mt-0 text-center lg:text-start gap-5'>

      <h1 className='flex flex-wrap font-bold items-center gap-4 text-7xl leading-tight'>
        <span className='text-green-700'>Go<span className='text-orange-500'>Leo</span></span>
        <span className='text-2xl text-gray-700 font-light mt-2'>Haz que cada pase cuente!</span>
      </h1>
      <p className='text-xl'>Con GoLeo, cada jugada cuenta. Organiza tus torneos, sigue el rendimiento de tus jugadores y lleva el fútbol al siguiente nivel.</p>
        
    </div>

    <div className='lg:mt-0 w-full lg:w-4/6'>
      <img src={img} alt="img" />
    </div>
    
  </div>
  )
}
