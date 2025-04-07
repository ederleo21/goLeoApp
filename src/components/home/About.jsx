import React from 'react'
import about from '../../assets/img/g_players.jpg'

export const About = () => {

  return (
<div className='min-h-screen font-[Poppins] flex flex-col justify-center lg:flex-row items-center md:px-32 px-5 bg-[#111827] gap-10 mt-14'>
    <div className='w-full lg:w-2/4 space-y-5'>
        <h1 className='font-semibold text-4xl text-white leading-tight'>
            GoLeo nació en los barrios, pero está listo para cualquier torneo
        </h1>
        <p className='text-[#bdbdbd] pb-5'>
            Lo que empezó como una necesidad personal para organizar torneos de barrio, hoy es una plataforma que puede gestionar cualquier competencia, desde partidos locales hasta ligas profesionales.
            GoLeo te permite registrar jugadores, administrar clubes y llevar un control detallado de estadísticas con la facilidad que siempre soñaste.
        </p>
    </div>
    <div className='w-full lg:w-2/4'>
        <img className='rounded-2xl' src={about} alt="Imagen sobre GoLeo" />
    </div>
</div>

  )
}
