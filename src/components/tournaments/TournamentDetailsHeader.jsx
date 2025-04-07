import React, { useState, useContext } from 'react';
import { FaRegEye } from "react-icons/fa";
import { ModalUpdateTournament } from './ModalUpdateTournament';
import { FaTools } from "react-icons/fa";
import { Info } from "lucide-react"; 
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export const TournamentDetailsHeader = ({ tournament: currentTournament, children }) => {
  const [tournament, setTournament] = useState(currentTournament);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const { user } = useContext(UserContext);

  return (
  <div className={`relative w-full h-full ${children ? 'pt-10 pb-1' : 'py-10'} flex items-center bg-gray-900 text-white overflow-hidden rounded-lg shadow-lg font-[Poppins]`}>
    <img
      src={tournament.photo}
      alt={tournament.name}
      className="absolute inset-0 w-full h-full object-cover opacity-40"
    />
  
    <div className="relative z-9 w-full flex gap-14 px-8 py-6">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md">{tournament.name}
          {user.permissions.change_tournament && 
            <button onClick={() => setIsModalOpenUpdate(true)}><FaTools className='text-4xl text-teal-300 ml-4 hover:scale-105'/></button>
          }
        </h1>
        <p className="text-lg font-light text-center">
          {tournament.description || "Un emocionante torneo amistoso que no te puedes perder."}
        </p>

        <div className={`grid ${children ? 'grid-cols-2' : 'grid-cols-1'} gap-4 text-center max-w-xl`}>
          <div className={`grid ${children ? 'grid-cols-1' : 'grid-cols-2'} gap-4 text-center`}>
            <div className="border border-gray-500 bg-gray-800 bg-opacity-50 px-6 py-3 rounded-lg text-sm md:text-lg shadow-md">
              <span className="font-semibold"></span> {tournament.type}
            </div>
            <div className={`border border-gray-500 font-bold bg-gray-800 bg-opacity-50 px-6 py-3 rounded-lg text-sm md:text-lg shadow-md ${tournament.active ? 'text-green-400' : 'text-red-400'}`}>
              {tournament.active ? 'Activo' : 'Inactivo'}
            </div>
            <div className="border border-gray-500 bg-gray-800 bg-opacity-50 px-6 py-3 rounded-lg text-sm md:text-lg shadow-md">
              <span className="font-semibold">Inicio:</span> {tournament.start_date}
            </div>
            <div className="border border-gray-500 bg-gray-800 bg-opacity-50 px-6 py-3 rounded-lg text-sm md:text-lg shadow-md">
              <span className="font-semibold">Fin:</span> {tournament.end_date}
            </div>
          </div>

           {children && (
            <div>
              {children}
            </div>
           )}
        </div>
      </div>
    
      <div className="hidden lg:flex w-1/2 flex-wrap justify-center items-center bg-gray-800 bg-opacity-50 p-6 rounded-lg overflow-y-auto max-h-72 shadow-lg border-white border-2">
        <h2 className="text-2xl font-semibold w-full text-center mb-4 text-white">
          Participantes del torneo
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
          <ShowClubs clubs={tournament.clubs} />
        </div>
      </div>

        
      <div className="lg:hidden absolute top-[-25px] right-0 mr-4">
        <button
          className="px-3 py-2 bg-white flex text-base sm:text-lg items-center gap-2 text-black font-bold rounded shadow-md hover:bg-slate-200 transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          <FaRegEye className='text-lg sm:text-xl'/>
          Ver Clubs
        </button>
      </div>
        
        
      {isModalOpen && (
        <div className="fixed inset-0 flex lg:hidden justify-center items-center z-10">
          <div className="text-white bg-slate-800 rounded-lg p-6 w-8/12 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Clubes participantes</h2>
              <button
                className="text-white text-4xl"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ShowClubs clubs={tournament.clubs} />
            </div>
          </div>
        </div>
      )}

      {isModalOpenUpdate && (
        <ModalUpdateTournament onClose={() => setIsModalOpenUpdate(false)} tournament={tournament} setTournament={setTournament} />
      )}

    </div>
  </div>
  );
};



const ShowClubs = ({ clubs }) => {
  return (
    <>
      {clubs?.map((club) => (
        <div
          key={club.id}
          className="relative bg-gray-900 bg-opacity-80 border border-gray-700 shadow-lg rounded-xl p-4 flex flex-col items-center transition-all hover:scale-105 hover:shadow-2xl"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
            <img
              src={club.logo}
              alt={club.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-3 text-sm text-white text-center font-semibold">
            {club.name}
          </span>
          <NavLink to={`/clubs/club/${club.id}`}>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
              title={`Ver información de ${club.name}`}
            >
              <Info size={24} />
            </button>
          </NavLink>
        </div>
      ))}
    </>
  );
};

