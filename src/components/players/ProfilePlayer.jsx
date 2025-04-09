import React, { useEffect, useState } from 'react'
import { IoIosPerson } from "react-icons/io";
import { MdPhoneInTalk } from "react-icons/md";
import { ModalPersonalUpdate } from './ModalPersonalUpdate';
import { ModalSkillsUpdate } from './ModalSkillsUpdate';
import { deletePlayer } from '../../api/playersApi';
import { useDispatch } from 'react-redux';
import { Modal } from '../utils/Modal';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Loading } from '../utils/Loading';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllPlayers } from '../../api/playersApi';

export const ProfilePlayer = ({ player }) => {

  const { user, loading } = useContext(UserContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { players, currentPlayer } = useSelector(state => state.players)
  const clubId = currentPlayer.club.id

  if (loading){
    return(
        <Loading/>
    )
  }

  useEffect(() => {
    const fetchPlayers = async () => {
        if (!players || players.length === 0){ 
            await dispatch(getAllPlayers(clubId));
        }
    };
    fetchPlayers();
}, [dispatch, players, clubId]);  


  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const handleDeletePlayer = () => {
    dispatch(deletePlayer(player.id));
    setDeleteModalOpen(false);
    toast.success("Jugador eliminado con éxito");
    navigate('/players/');
  }

    const getColor = (score) => {
        if (score < 40) return 'bg-red-500'; 
        if (score < 70) return 'bg-yellow-500'; 
        return 'bg-green-500'; 
      };

  return (
<div className="player-profile max-w-4xl mx-auto font-[Poppins] bg-white shadow-xl rounded-lg overflow-hidden p-5">
  {/* Sección superior: Foto y Habilidades */}
  <div className="top-section grid grid-cols-1 md:grid-cols-2 items-start gap-6 mb-5 relative">
    <div className="player-photo flex-1 h-full relative">
      <img
        src={player.photo}
        alt={`${player.first_name} ${player.last_name}`}
        className="w-full h-full object-cover rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
      />
      <div className="dorsal absolute top-4 right-4 bg-indigo text-white font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-4xl font-[Gupter]">
        {player.dorsal}
      </div>
    </div>

    <div className="player-skills p-4 rounded-lg shadow-md flex-1 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-indigo text-center">Skills</h3>
        { user.permissions.change_playerskill && 
        <button className="bg-indigo text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        onClick={() => setSkillsModalOpen(true)}
        >
          Actualizar
        </button>
        }
      </div>
      {player?.skills && (
        <ul className={`grid grid-cols-1 ${Object.entries(player.skills).length === 1 ? 'max-w-sm mx-auto' : 'sm:grid-cols-2'} gap-4 list-none text-lg`}>
          {Object.entries(player.skills).map(([skill, value]) => (
            <li key={skill} className={`p-4 rounded-lg shadow-lg text-white ${getColor(value)} flex flex-col justify-between`}>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                <strong className="ml-2">{value}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

  {/* Sección inferior: Información Personal en dos columnas */}
  <div className="bottom-section bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="personal-info bg-white p-5 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <h4 className="text-xl flex justify-between items-center font-bold border-b-2 border-indigo mb-4 text-indigo">Datos Personales <IoIosPerson className='text-3xl'/></h4>
        <ul className="list-none space-y-3 text-lg text-gray-700">
          <li><strong>Nombre - </strong> {player.first_name} {player.last_name}</li>
          <li><strong>Posición - </strong> {player.position.description}</li>
          <li><strong>Fecha de Nacimiento - </strong> {player.date_of_birth}</li>
        </ul>

        <div className="flex items-center justify-between mt-5">
          <img src={player.nationality.flag} alt={player.nationality.name} className="w-14 h-10 mr-2 rounded" />
          <img src={player.club.logo} alt={player.club.name} className="w-10 h-10" />
        </div>
      </div>
      
      <div className="contact-info bg-white p-5 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <h4 className="text-xl flex justify-between items-center font-bold border-b-2 border-indigo mb-4 text-indigo">Contacto <MdPhoneInTalk className='text-3xl'/></h4>
        <ul className="list-none space-y-3 text-lg text-gray-700">
          <li><strong>Teléfono - </strong> {player.phone ? player.phone : 'No disponible'}</li>
          <li><strong>Email - </strong> {player.email ? player.email : 'No disponible'}</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Sección de botones */}
  <div className="flex flex-col sm:flex-row justify-between mt-5 space-y-3 sm:space-y-0">
    { user.permissions.change_player && 
    <button className="bg-indigo text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      onClick={() => setPersonalModalOpen(true)}
    >
      Actualizar datos personales
    </button>
    }
    { user.permissions.delete_player && 
    <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
    onClick={() => setDeleteModalOpen(true)}
    >
      Eliminar jugador
    </button>
    }
  </div>

  {/* Modales de actualización */}
  <ModalPersonalUpdate
  isOpen={personalModalOpen}
  onClose={() => setPersonalModalOpen(false)}
  player={player}
  players={players}
  />
  <ModalSkillsUpdate 
    isOpen={skillsModalOpen}
    onClose={() => setSkillsModalOpen(false)}
    skills={player.skills}
    playerId={player.id}
  />

  <Modal
    show={deleteModalOpen}
    onClose={() => setDeleteModalOpen(false)}
    onConfirm={handleDeletePlayer}
  title="¿Estás seguro de eliminar este jugador?"
  >
    <p className='mb-5 text-white'>{player.first_name} {player.last_name} será eliminado lógicamente.</p>
  </Modal>
</div>
  )
}
