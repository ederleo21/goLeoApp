import React from 'react';
import img from '../../assets/img/g_stadium.jpg';
import { FaUsers, FaTrophy, FaChartLine, FaFutbol } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const Characteristics = () => {
  return (

<div className='min-h-screen font-[Poppins] flex flex-col lg:flex-row items-center md:mx-32 mx-5 gap-14'>
    <div className='w-full lg:w-2/4'>
        <div className='space-y-6'>
            <h1 className='text-4xl font-bold text-center md:text-start leading-tight text-gray-700'>
                Todo lo que necesitas para dominar el fútbol
            </h1>

            <p className='text-lg text-[#333333] tracking-wide'>
                GoLeo te ofrece una plataforma todo-en-uno para gestionar tu torneo: desde jugadores y clubes hasta estadísticas avanzadas. 
                Con un solo clic, tendrás control total sobre cada detalle, asegurando una experiencia de fútbol más organizada y profesional.
            </p>
        </div>
        <div className='w-full lg:w-4/5 mt-10 lg:ml-14'>
            <img className='rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out' src={img} alt="Imagen principal de la app" />
        </div>
    </div>
    <div className='w-full lg:w-2/4 space-y-10'>
        {/* Contenedor de Beneficios */}
        <div className='space-y-3'>
            <div className='flex flex-row gap-5 items-center p-5 rounded-xl border-2 border-[#E2E8F0] hover:bg-[#F3F4F6] transition-all'>
                <div className='flex flex-row items-center w-16'>
                    <FaUsers size={40} color="#34D399" />
                </div>
                <div className='space-y-2'>
                    <h1 className='font-bold text-xl text-[#1D4ED8]'>Gestión de Jugadores</h1>
                    <p className='text-[#555555]'>
                        Registra y lleva un seguimiento detallado del rendimiento de cada jugador. ¡Controla sus estadísticas y evolución en cada partido!
                    </p>
                    <NavLink to={`/players`} className='text-sm text-[#1D4ED8] hover:text-[#10B981]'>
                        Comenzar
                    </NavLink>
                </div>
            </div>

            <div className='flex flex-row gap-5 items-center p-5 rounded-xl border-2 border-[#E2E8F0] hover:bg-[#F3F4F6] transition-all'>
                <div className='flex flex-row items-center w-16'>
                    <FaTrophy size={40} color="#FF9900" />
                </div>
                <div className='space-y-2'>
                    <h1 className='font-bold text-xl text-[#1D4ED8]'>Gestión de Clubes</h1>
                    <p className='text-[#555555]'>
                        Administra tus clubes con facilidad, visualiza sus estadísticas y haz un seguimiento de su desempeño en cada torneo.
                    </p>
                    <NavLink to={`/clubs`} className='text-sm text-[#1D4ED8] hover:text-[#10B981]'>
                        Comenzar
                    </NavLink>
                </div>
            </div>

            <div className='flex flex-row gap-5 items-center p-5 rounded-xl border-2 border-[#E2E8F0] hover:bg-[#F3F4F6] transition-all'>
                <div className='flex flex-row items-center w-16'>
                    <FaFutbol size={40} color="#1D4ED8" />
                </div>
                <div className='space-y-2'>
                    <h1 className='font-bold text-xl text-[#1D4ED8]'>Organización de Torneos</h1>
                    <p className='text-[#555555]'>
                        Crea torneos personalizados, organiza partidos y asegúrate de que todo se ejecute a la perfección, ¡sin estrés!
                    </p>
                    <NavLink to={`/tournaments`} className='text-sm text-[#1D4ED8] hover:text-[#10B981]'>
                        Comenzar
                    </NavLink>
                </div>
            </div>

            <div className='flex flex-row gap-5 items-center p-5 rounded-xl border-2 border-[#E2E8F0] hover:bg-[#F3F4F6] transition-all'>
                <div className='flex flex-row items-center w-16'>
                    <FaChartLine size={40} color="#10B981" />
                </div>
                <div className='space-y-2'>
                    <h1 className='font-bold text-xl text-[#1D4ED8]'>Estadísticas Avanzadas</h1>
                    <p className='text-[#555555]'>
                        Desde goles hasta asistencias, GoLeo te proporciona estadísticas completas para que puedas tomar decisiones más informadas.
                    </p>
                    <NavLink to={`/performances`} className='text-sm text-[#1D4ED8] hover:text-[#10B981]'>
                        Comenzar
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}
